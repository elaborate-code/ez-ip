import type MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import type WildcardMaskIpv4 from '@/libs/Ipv4/Addresses/WildcardMaskIpv4'
import type BroadcastAddressIpv4 from '@/libs/Ipv4/Addresses/BroadcastAddressIpv4'
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import PrefixIpv4 from '@/libs/Ipv4/Addresses/PrefixIpv4'
import type NetworkAddressIpv4 from '@/libs/Ipv4/Addresses/NetworkAddressIpv4'

export default class NetworkIpv4 {
    readonly mask: MaskIpv4
    readonly prefix: PrefixIpv4
    readonly size: number
    readonly wildcardMask: WildcardMaskIpv4
    readonly networkAddress: NetworkAddressIpv4
    readonly firstHostAddress: AddressIpv4
    readonly lastHostAddress: AddressIpv4
    readonly broadcastAddress: BroadcastAddressIpv4

    // private usedCapacity: number = 0
    private subnets: Map<string, { subnet: NetworkIpv4; inRange: boolean }> = new Map()

    // TODO: support more signatures (anyIp can be binary or array, can give prefix instead of mask ...)
    constructor(anyIp: AddressIpv4, mask: MaskIpv4) {
        this.mask = mask
        this.prefix = this.mask.makePrefix()
        this.size = this.prefix.size
        this.wildcardMask = this.mask.makeWildcard()
        this.networkAddress = this.mask.makeNetworkAddress(anyIp)
        this.firstHostAddress = this.networkAddress.makeFirstHostAddress()
        this.broadcastAddress = this.wildcardMask.makeBroadcastAddress(anyIp)
        this.lastHostAddress = this.broadcastAddress.makeLastHostAddress()
    }

    addSubnetBySize(name: string, subnetSize: number) {
        if (this.subnets.has(name)) {
            throw new Error('Subnet name already in use')
        }

        const subnetPrefix = new PrefixIpv4(Math.floor(32 - Math.log2(subnetSize + 2)))
        const subnetMask = subnetPrefix.makeMask()

        let subnetAddress
        if (this.subnets.size === 0) {
            subnetAddress = this.networkAddress
        } else {
            subnetAddress = Array.from(this.subnets.values())[
                this.subnets.size - 1
            ].subnet.broadcastAddress.nextAddress()
        }

        this.addSubnet(name, new NetworkIpv4(subnetAddress, subnetMask))
    }

    addSubnet(name: string, subnet: NetworkIpv4) {
        this.subnets.set(name, { subnet, inRange: this.containsSubnet(subnet) })
    }

    getSubnet(name: string): { subnet: NetworkIpv4; inRange: boolean } | undefined {
        return this.subnets.get(name)
    }

    // removeSubnet(name: string) {
    //     this.subnets.delete(name)
    // }

    containsSubnet(subnet: NetworkIpv4): boolean {
        return (
            this.networkAddress.lesserThanOrEqualTo(subnet.networkAddress) &&
            this.broadcastAddress.greaterThanOrEqualTo(subnet.broadcastAddress)
        )
    }

    containsAddress(address: AddressIpv4): boolean {
        return (
            this.networkAddress.lesserThanOrEqualTo(address) &&
            this.broadcastAddress.greaterThanOrEqualTo(address)
        )
    }
}