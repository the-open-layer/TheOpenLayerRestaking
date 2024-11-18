import "@stdlib/deploy";
import "@stdlib/ownable";
import "./ReStakingMaster.tact";
import "./messages.tact";

struct StakingMasterData {
    jettonMaster: Address;
    symbol: String;
    name: String;
    image: String;
}

message DeployReStakingMaster {
    queryId: Int as uint64;
    data: StakingMasterData;
}

// Factory contract to manage multiple ReStaking masters 
contract RestakingFactory with Deployable, OwnableTransferable {
    index: Int as uint64;
    owner: Address;
    // Map to store all restaking masters
    masters: map<Address, StakingMasterData>;

    init() {
        self.index = 0;
        self.owner = sender();
        self.masters = emptyMap();
    }

    // Deploy new ReStaking master contract
    receive(msg: DeployReStakingMaster) {
        // Only owner can deploy new masters
        require(sender() == self.owner, "Invalid sender");
        
        // Create new ReStaking master
        let data = msg.data;
        let init: StateInit = initOf StakingMasterTemplate(data.jettonMaster);
        let address: Address = contractAddress(init);

        // Store master address
        self.masters.set(address, data);
        self.index = self.index + 1;
        
        // Deploy master contract
        send(SendParameters{
            to: address,
            value: ton("0.1"),
            mode: SendRemainingValue,
            body: emptyCell(),
            code: init.code,
            data: init.data
        });
    }

    // Get factory ID
    get fun index(): Int {
        return self.index;
    }

    // Get master address by index
    get fun master(jettonMaster: Address): StakingMasterData? {
        return self.masters.get(jettonMaster);
    }
}

