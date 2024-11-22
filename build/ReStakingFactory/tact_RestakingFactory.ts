import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type StakingWalletTemplate$Data = {
    $$type: 'StakingWalletTemplate$Data';
    owner: Address;
    master: Address;
    staticTax: bigint;
    lockedValue: bigint;
    stakeIndex: bigint;
    unstakeThreshold: bigint;
    stakedJettons: Dictionary<bigint, StakedJettonInfo>;
    pendingJettons: Dictionary<bigint, PendingJettonInfo>;
}

export function storeStakingWalletTemplate$Data(src: StakingWalletTemplate$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeCoins(src.staticTax);
        b_0.storeCoins(src.lockedValue);
        let b_1 = new Builder();
        b_1.storeInt(src.stakeIndex, 257);
        b_1.storeInt(src.unstakeThreshold, 257);
        b_1.storeDict(src.stakedJettons, Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo());
        b_1.storeDict(src.pendingJettons, Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStakingWalletTemplate$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _staticTax = sc_0.loadCoins();
    let _lockedValue = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _stakeIndex = sc_1.loadIntBig(257);
    let _unstakeThreshold = sc_1.loadIntBig(257);
    let _stakedJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), sc_1);
    let _pendingJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), sc_1);
    return { $$type: 'StakingWalletTemplate$Data' as const, owner: _owner, master: _master, staticTax: _staticTax, lockedValue: _lockedValue, stakeIndex: _stakeIndex, unstakeThreshold: _unstakeThreshold, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons };
}

function loadTupleStakingWalletTemplate$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _staticTax = source.readBigNumber();
    let _lockedValue = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _unstakeThreshold = source.readBigNumber();
    let _stakedJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), source.readCellOpt());
    let _pendingJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), source.readCellOpt());
    return { $$type: 'StakingWalletTemplate$Data' as const, owner: _owner, master: _master, staticTax: _staticTax, lockedValue: _lockedValue, stakeIndex: _stakeIndex, unstakeThreshold: _unstakeThreshold, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons };
}

function loadGetterTupleStakingWalletTemplate$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _staticTax = source.readBigNumber();
    let _lockedValue = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _unstakeThreshold = source.readBigNumber();
    let _stakedJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), source.readCellOpt());
    let _pendingJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), source.readCellOpt());
    return { $$type: 'StakingWalletTemplate$Data' as const, owner: _owner, master: _master, staticTax: _staticTax, lockedValue: _lockedValue, stakeIndex: _stakeIndex, unstakeThreshold: _unstakeThreshold, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons };
}

function storeTupleStakingWalletTemplate$Data(source: StakingWalletTemplate$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeNumber(source.staticTax);
    builder.writeNumber(source.lockedValue);
    builder.writeNumber(source.stakeIndex);
    builder.writeNumber(source.unstakeThreshold);
    builder.writeCell(source.stakedJettons.size > 0 ? beginCell().storeDictDirect(source.stakedJettons, Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo()).endCell() : null);
    builder.writeCell(source.pendingJettons.size > 0 ? beginCell().storeDictDirect(source.pendingJettons, Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo()).endCell() : null);
    return builder.build();
}

function dictValueParserStakingWalletTemplate$Data(): DictionaryValue<StakingWalletTemplate$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakingWalletTemplate$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStakingWalletTemplate$Data(src.loadRef().beginParse());
        }
    }
}

export type StakingMasterTemplate$Data = {
    $$type: 'StakingMasterTemplate$Data';
    owner: Address;
    staticTax: bigint;
    lockedValue: bigint;
}

export function storeStakingMasterTemplate$Data(src: StakingMasterTemplate$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.staticTax);
        b_0.storeCoins(src.lockedValue);
    };
}

export function loadStakingMasterTemplate$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _staticTax = sc_0.loadCoins();
    let _lockedValue = sc_0.loadCoins();
    return { $$type: 'StakingMasterTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue };
}

function loadTupleStakingMasterTemplate$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _staticTax = source.readBigNumber();
    let _lockedValue = source.readBigNumber();
    return { $$type: 'StakingMasterTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue };
}

function loadGetterTupleStakingMasterTemplate$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _staticTax = source.readBigNumber();
    let _lockedValue = source.readBigNumber();
    return { $$type: 'StakingMasterTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue };
}

function storeTupleStakingMasterTemplate$Data(source: StakingMasterTemplate$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.staticTax);
    builder.writeNumber(source.lockedValue);
    return builder.build();
}

function dictValueParserStakingMasterTemplate$Data(): DictionaryValue<StakingMasterTemplate$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakingMasterTemplate$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStakingMasterTemplate$Data(src.loadRef().beginParse());
        }
    }
}

export type StakeInternal = {
    $$type: 'StakeInternal';
    queryId: bigint;
    jettonWallet: Address;
    jettonAmount: bigint;
    responseDestination: Address;
    forwardAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeStakeInternal(src: StakeInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2652593455, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadStakeInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2652593455) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _jettonWallet = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadCoins();
    let _responseDestination = sc_0.loadAddress();
    let _forwardAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'StakeInternal' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleStakeInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _responseDestination = source.readAddress();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeInternal' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleStakeInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _responseDestination = source.readAddress();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeInternal' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleStakeInternal(source: StakeInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.jettonWallet);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserStakeInternal(): DictionaryValue<StakeInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakeInternal(src)).endCell());
        },
        parse: (src) => {
            return loadStakeInternal(src.loadRef().beginParse());
        }
    }
}

export type UnStake = {
    $$type: 'UnStake';
    queryId: bigint;
    stakeIndex: bigint;
    jettonAmount: bigint;
    jettonWallet: Address;
    forwardPayload: Cell | null;
}

export function storeUnStake(src: UnStake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1300905072, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.stakeIndex, 32);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.jettonWallet);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadUnStake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1300905072) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _stakeIndex = sc_0.loadUintBig(32);
    let _jettonAmount = sc_0.loadCoins();
    let _jettonWallet = sc_0.loadAddress();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'UnStake' as const, queryId: _queryId, stakeIndex: _stakeIndex, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function loadTupleUnStake(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'UnStake' as const, queryId: _queryId, stakeIndex: _stakeIndex, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function loadGetterTupleUnStake(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'UnStake' as const, queryId: _queryId, stakeIndex: _stakeIndex, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function storeTupleUnStake(source: UnStake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.stakeIndex);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.jettonWallet);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserUnStake(): DictionaryValue<UnStake> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnStake(src)).endCell());
        },
        parse: (src) => {
            return loadUnStake(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    queryId: bigint;
    stakeIndex: bigint;
    tonAmount: bigint;
    forwardAmount: bigint;
    jettonWallet: Address;
    responseDestination: Address;
    forwardPayload: Cell | null;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1798250141, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.stakeIndex, 32);
        b_0.storeCoins(src.tonAmount);
        b_0.storeCoins(src.forwardAmount);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeAddress(src.responseDestination);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1798250141) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _stakeIndex = sc_0.loadUintBig(32);
    let _tonAmount = sc_0.loadCoins();
    let _forwardAmount = sc_0.loadCoins();
    let _jettonWallet = sc_0.loadAddress();
    let _responseDestination = sc_0.loadAddress();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Withdraw' as const, queryId: _queryId, stakeIndex: _stakeIndex, tonAmount: _tonAmount, forwardAmount: _forwardAmount, jettonWallet: _jettonWallet, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function loadTupleWithdraw(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _responseDestination = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'Withdraw' as const, queryId: _queryId, stakeIndex: _stakeIndex, tonAmount: _tonAmount, forwardAmount: _forwardAmount, jettonWallet: _jettonWallet, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _responseDestination = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'Withdraw' as const, queryId: _queryId, stakeIndex: _stakeIndex, tonAmount: _tonAmount, forwardAmount: _forwardAmount, jettonWallet: _jettonWallet, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.stakeIndex);
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.forwardAmount);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type WithdrawInternal = {
    $$type: 'WithdrawInternal';
    queryId: bigint;
    jettonAmount: bigint;
    forwardAmount: bigint;
    tonAmount: bigint;
    stakeIndex: bigint;
    jettonWallet: Address;
    destination: Address;
    responseDestination: Address;
    forwardPayload: Cell | null;
}

export function storeWithdrawInternal(src: WithdrawInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3317277393, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeCoins(src.forwardAmount);
        b_0.storeCoins(src.tonAmount);
        b_0.storeUint(src.stakeIndex, 32);
        b_0.storeAddress(src.jettonWallet);
        let b_1 = new Builder();
        b_1.storeAddress(src.destination);
        b_1.storeAddress(src.responseDestination);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_1.storeBit(true).storeRef(src.forwardPayload); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadWithdrawInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3317277393) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _jettonAmount = sc_0.loadCoins();
    let _forwardAmount = sc_0.loadCoins();
    let _tonAmount = sc_0.loadCoins();
    let _stakeIndex = sc_0.loadUintBig(32);
    let _jettonWallet = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _destination = sc_1.loadAddress();
    let _responseDestination = sc_1.loadAddress();
    let _forwardPayload = sc_1.loadBit() ? sc_1.loadRef() : null;
    return { $$type: 'WithdrawInternal' as const, queryId: _queryId, jettonAmount: _jettonAmount, forwardAmount: _forwardAmount, tonAmount: _tonAmount, stakeIndex: _stakeIndex, jettonWallet: _jettonWallet, destination: _destination, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function loadTupleWithdrawInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'WithdrawInternal' as const, queryId: _queryId, jettonAmount: _jettonAmount, forwardAmount: _forwardAmount, tonAmount: _tonAmount, stakeIndex: _stakeIndex, jettonWallet: _jettonWallet, destination: _destination, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function loadGetterTupleWithdrawInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'WithdrawInternal' as const, queryId: _queryId, jettonAmount: _jettonAmount, forwardAmount: _forwardAmount, tonAmount: _tonAmount, stakeIndex: _stakeIndex, jettonWallet: _jettonWallet, destination: _destination, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function storeTupleWithdrawInternal(source: WithdrawInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.forwardAmount);
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.stakeIndex);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserWithdrawInternal(): DictionaryValue<WithdrawInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawInternal(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawInternal(src.loadRef().beginParse());
        }
    }
}

export type Redeposit = {
    $$type: 'Redeposit';
    queryId: bigint;
    stakeIndex: bigint;
    forwardAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeRedeposit(src: Redeposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3316233234, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.stakeIndex, 32);
        b_0.storeCoins(src.forwardAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadRedeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3316233234) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _stakeIndex = sc_0.loadUintBig(32);
    let _forwardAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Redeposit' as const, queryId: _queryId, stakeIndex: _stakeIndex, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleRedeposit(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'Redeposit' as const, queryId: _queryId, stakeIndex: _stakeIndex, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleRedeposit(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'Redeposit' as const, queryId: _queryId, stakeIndex: _stakeIndex, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleRedeposit(source: Redeposit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.stakeIndex);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserRedeposit(): DictionaryValue<Redeposit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRedeposit(src)).endCell());
        },
        parse: (src) => {
            return loadRedeposit(src.loadRef().beginParse());
        }
    }
}

export type StakeNotification = {
    $$type: 'StakeNotification';
    queryId: bigint;
    jettonAmount: bigint;
    jettonWallet: Address;
    forwardPayload: Cell | null;
}

export function storeStakeNotification(src: StakeNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2134781317, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.jettonWallet);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadStakeNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2134781317) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _jettonAmount = sc_0.loadCoins();
    let _jettonWallet = sc_0.loadAddress();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'StakeNotification' as const, queryId: _queryId, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function loadTupleStakeNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeNotification' as const, queryId: _queryId, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function loadGetterTupleStakeNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeNotification' as const, queryId: _queryId, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function storeTupleStakeNotification(source: StakeNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.jettonWallet);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserStakeNotification(): DictionaryValue<StakeNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakeNotification(src)).endCell());
        },
        parse: (src) => {
            return loadStakeNotification(src.loadRef().beginParse());
        }
    }
}

export type StakeReleaseNotification = {
    $$type: 'StakeReleaseNotification';
    queryId: bigint;
    amount: bigint;
    stakeIndex: bigint;
    destination: Address;
    forwardPayload: Cell | null;
}

export function storeStakeReleaseNotification(src: StakeReleaseNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3864453026, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.stakeIndex, 64);
        b_0.storeAddress(src.destination);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadStakeReleaseNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3864453026) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _stakeIndex = sc_0.loadUintBig(64);
    let _destination = sc_0.loadAddress();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'StakeReleaseNotification' as const, queryId: _queryId, amount: _amount, stakeIndex: _stakeIndex, destination: _destination, forwardPayload: _forwardPayload };
}

function loadTupleStakeReleaseNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _destination = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeReleaseNotification' as const, queryId: _queryId, amount: _amount, stakeIndex: _stakeIndex, destination: _destination, forwardPayload: _forwardPayload };
}

function loadGetterTupleStakeReleaseNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _destination = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeReleaseNotification' as const, queryId: _queryId, amount: _amount, stakeIndex: _stakeIndex, destination: _destination, forwardPayload: _forwardPayload };
}

function storeTupleStakeReleaseNotification(source: StakeReleaseNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.stakeIndex);
    builder.writeAddress(source.destination);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserStakeReleaseNotification(): DictionaryValue<StakeReleaseNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakeReleaseNotification(src)).endCell());
        },
        parse: (src) => {
            return loadStakeReleaseNotification(src.loadRef().beginParse());
        }
    }
}

export type StakeRelease = {
    $$type: 'StakeRelease';
    queryId: bigint;
    amount: bigint;
    jettons: Dictionary<bigint, StakeReleaseJettonInfo>;
    jettonsIdx: bigint;
    owner: Address;
    destination: Address;
    responseDestination: Address;
    customPayload: Cell | null;
    forwardAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeStakeRelease(src: StakeRelease) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1375353473, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeDict(src.jettons, Dictionary.Keys.BigUint(64), dictValueParserStakeReleaseJettonInfo());
        b_0.storeUint(src.jettonsIdx, 64);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.destination);
        let b_1 = new Builder();
        b_1.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_1.storeBit(true).storeRef(src.customPayload); } else { b_1.storeBit(false); }
        b_1.storeCoins(src.forwardAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_1.storeBit(true).storeRef(src.forwardPayload); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStakeRelease(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1375353473) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _jettons = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserStakeReleaseJettonInfo(), sc_0);
    let _jettonsIdx = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let _destination = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _responseDestination = sc_1.loadAddress();
    let _customPayload = sc_1.loadBit() ? sc_1.loadRef() : null;
    let _forwardAmount = sc_1.loadCoins();
    let _forwardPayload = sc_1.loadBit() ? sc_1.loadRef() : null;
    return { $$type: 'StakeRelease' as const, queryId: _queryId, amount: _amount, jettons: _jettons, jettonsIdx: _jettonsIdx, owner: _owner, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleStakeRelease(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _jettons = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserStakeReleaseJettonInfo(), source.readCellOpt());
    let _jettonsIdx = source.readBigNumber();
    let _owner = source.readAddress();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddress();
    let _customPayload = source.readCellOpt();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeRelease' as const, queryId: _queryId, amount: _amount, jettons: _jettons, jettonsIdx: _jettonsIdx, owner: _owner, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleStakeRelease(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _jettons = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserStakeReleaseJettonInfo(), source.readCellOpt());
    let _jettonsIdx = source.readBigNumber();
    let _owner = source.readAddress();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddress();
    let _customPayload = source.readCellOpt();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeRelease' as const, queryId: _queryId, amount: _amount, jettons: _jettons, jettonsIdx: _jettonsIdx, owner: _owner, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleStakeRelease(source: StakeRelease) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeCell(source.jettons.size > 0 ? beginCell().storeDictDirect(source.jettons, Dictionary.Keys.BigUint(64), dictValueParserStakeReleaseJettonInfo()).endCell() : null);
    builder.writeNumber(source.jettonsIdx);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserStakeRelease(): DictionaryValue<StakeRelease> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakeRelease(src)).endCell());
        },
        parse: (src) => {
            return loadStakeRelease(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferForwardPayload = {
    $$type: 'TokenTransferForwardPayload';
    type: bigint;
    stakeJetton: StakeJetton | null;
    stakeRelease: StakeReleaseNotification | null;
}

export function storeTokenTransferForwardPayload(src: TokenTransferForwardPayload) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.type, 8);
        if (src.stakeJetton !== null && src.stakeJetton !== undefined) { b_0.storeBit(true); b_0.store(storeStakeJetton(src.stakeJetton)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.stakeRelease !== null && src.stakeRelease !== undefined) { b_1.storeBit(true); b_1.store(storeStakeReleaseNotification(src.stakeRelease)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenTransferForwardPayload(slice: Slice) {
    let sc_0 = slice;
    let _type = sc_0.loadUintBig(8);
    let _stakeJetton = sc_0.loadBit() ? loadStakeJetton(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _stakeRelease = sc_1.loadBit() ? loadStakeReleaseNotification(sc_1) : null;
    return { $$type: 'TokenTransferForwardPayload' as const, type: _type, stakeJetton: _stakeJetton, stakeRelease: _stakeRelease };
}

function loadTupleTokenTransferForwardPayload(source: TupleReader) {
    let _type = source.readBigNumber();
    const _stakeJetton_p = source.readTupleOpt();
    const _stakeJetton = _stakeJetton_p ? loadTupleStakeJetton(_stakeJetton_p) : null;
    const _stakeRelease_p = source.readTupleOpt();
    const _stakeRelease = _stakeRelease_p ? loadTupleStakeReleaseNotification(_stakeRelease_p) : null;
    return { $$type: 'TokenTransferForwardPayload' as const, type: _type, stakeJetton: _stakeJetton, stakeRelease: _stakeRelease };
}

function loadGetterTupleTokenTransferForwardPayload(source: TupleReader) {
    let _type = source.readBigNumber();
    const _stakeJetton_p = source.readTupleOpt();
    const _stakeJetton = _stakeJetton_p ? loadTupleStakeJetton(_stakeJetton_p) : null;
    const _stakeRelease_p = source.readTupleOpt();
    const _stakeRelease = _stakeRelease_p ? loadTupleStakeReleaseNotification(_stakeRelease_p) : null;
    return { $$type: 'TokenTransferForwardPayload' as const, type: _type, stakeJetton: _stakeJetton, stakeRelease: _stakeRelease };
}

function storeTupleTokenTransferForwardPayload(source: TokenTransferForwardPayload) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.type);
    if (source.stakeJetton !== null && source.stakeJetton !== undefined) {
        builder.writeTuple(storeTupleStakeJetton(source.stakeJetton));
    } else {
        builder.writeTuple(null);
    }
    if (source.stakeRelease !== null && source.stakeRelease !== undefined) {
        builder.writeTuple(storeTupleStakeReleaseNotification(source.stakeRelease));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserTokenTransferForwardPayload(): DictionaryValue<TokenTransferForwardPayload> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferForwardPayload(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferForwardPayload(src.loadRef().beginParse());
        }
    }
}

export type StakeJetton = {
    $$type: 'StakeJetton';
    tonAmount: bigint;
    responseDestination: Address;
    forwardAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeStakeJetton(src: StakeJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.tonAmount);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadStakeJetton(slice: Slice) {
    let sc_0 = slice;
    let _tonAmount = sc_0.loadCoins();
    let _responseDestination = sc_0.loadAddress();
    let _forwardAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'StakeJetton' as const, tonAmount: _tonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleStakeJetton(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _responseDestination = source.readAddress();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeJetton' as const, tonAmount: _tonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleStakeJetton(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _responseDestination = source.readAddress();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeJetton' as const, tonAmount: _tonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleStakeJetton(source: StakeJetton) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tonAmount);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserStakeJetton(): DictionaryValue<StakeJetton> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakeJetton(src)).endCell());
        },
        parse: (src) => {
            return loadStakeJetton(src.loadRef().beginParse());
        }
    }
}

export type StakeReleaseJettonInfo = {
    $$type: 'StakeReleaseJettonInfo';
    tonAmount: bigint;
    jettonAmount: bigint;
    jettonWallet: Address;
    destination: Address;
    customPayload: Cell | null;
    forwardAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeStakeReleaseJettonInfo(src: StakeReleaseJettonInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.tonAmount);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeAddress(src.destination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadStakeReleaseJettonInfo(slice: Slice) {
    let sc_0 = slice;
    let _tonAmount = sc_0.loadCoins();
    let _jettonAmount = sc_0.loadCoins();
    let _jettonWallet = sc_0.loadAddress();
    let _destination = sc_0.loadAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'StakeReleaseJettonInfo' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, destination: _destination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleStakeReleaseJettonInfo(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _destination = source.readAddress();
    let _customPayload = source.readCellOpt();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeReleaseJettonInfo' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, destination: _destination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleStakeReleaseJettonInfo(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _destination = source.readAddress();
    let _customPayload = source.readCellOpt();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'StakeReleaseJettonInfo' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, destination: _destination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleStakeReleaseJettonInfo(source: StakeReleaseJettonInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.destination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserStakeReleaseJettonInfo(): DictionaryValue<StakeReleaseJettonInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakeReleaseJettonInfo(src)).endCell());
        },
        parse: (src) => {
            return loadStakeReleaseJettonInfo(src.loadRef().beginParse());
        }
    }
}

export type JettonWithdrawInfo = {
    $$type: 'JettonWithdrawInfo';
    tonAmount: bigint;
    jettonAmount: bigint;
    jettonWallet: Address;
    destination: Address;
    customPayload: Cell | null;
    forwardAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeJettonWithdrawInfo(src: JettonWithdrawInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.tonAmount);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeAddress(src.destination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonWithdrawInfo(slice: Slice) {
    let sc_0 = slice;
    let _tonAmount = sc_0.loadCoins();
    let _jettonAmount = sc_0.loadCoins();
    let _jettonWallet = sc_0.loadAddress();
    let _destination = sc_0.loadAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonWithdrawInfo' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, destination: _destination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleJettonWithdrawInfo(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _destination = source.readAddress();
    let _customPayload = source.readCellOpt();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'JettonWithdrawInfo' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, destination: _destination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonWithdrawInfo(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _destination = source.readAddress();
    let _customPayload = source.readCellOpt();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'JettonWithdrawInfo' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, destination: _destination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleJettonWithdrawInfo(source: JettonWithdrawInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.destination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserJettonWithdrawInfo(): DictionaryValue<JettonWithdrawInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWithdrawInfo(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWithdrawInfo(src.loadRef().beginParse());
        }
    }
}

export type StakedJettonInfo = {
    $$type: 'StakedJettonInfo';
    jettonAmount: bigint;
    stakeTime: bigint;
    stakeIndex: bigint;
}

export function storeStakedJettonInfo(src: StakedJettonInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.stakeTime, 32);
        b_0.storeUint(src.stakeIndex, 32);
    };
}

export function loadStakedJettonInfo(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _stakeTime = sc_0.loadUintBig(32);
    let _stakeIndex = sc_0.loadUintBig(32);
    return { $$type: 'StakedJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, stakeIndex: _stakeIndex };
}

function loadTupleStakedJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    return { $$type: 'StakedJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, stakeIndex: _stakeIndex };
}

function loadGetterTupleStakedJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    return { $$type: 'StakedJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, stakeIndex: _stakeIndex };
}

function storeTupleStakedJettonInfo(source: StakedJettonInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.stakeTime);
    builder.writeNumber(source.stakeIndex);
    return builder.build();
}

function dictValueParserStakedJettonInfo(): DictionaryValue<StakedJettonInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakedJettonInfo(src)).endCell());
        },
        parse: (src) => {
            return loadStakedJettonInfo(src.loadRef().beginParse());
        }
    }
}

export type PendingJettonInfo = {
    $$type: 'PendingJettonInfo';
    jettonAmount: bigint;
    stakeTime: bigint;
    stakeIndex: bigint;
    unstakeTime: bigint;
}

export function storePendingJettonInfo(src: PendingJettonInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.stakeTime, 32);
        b_0.storeUint(src.stakeIndex, 32);
        b_0.storeUint(src.unstakeTime, 32);
    };
}

export function loadPendingJettonInfo(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _stakeTime = sc_0.loadUintBig(32);
    let _stakeIndex = sc_0.loadUintBig(32);
    let _unstakeTime = sc_0.loadUintBig(32);
    return { $$type: 'PendingJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, stakeIndex: _stakeIndex, unstakeTime: _unstakeTime };
}

function loadTuplePendingJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _unstakeTime = source.readBigNumber();
    return { $$type: 'PendingJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, stakeIndex: _stakeIndex, unstakeTime: _unstakeTime };
}

function loadGetterTuplePendingJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _unstakeTime = source.readBigNumber();
    return { $$type: 'PendingJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, stakeIndex: _stakeIndex, unstakeTime: _unstakeTime };
}

function storeTuplePendingJettonInfo(source: PendingJettonInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.stakeTime);
    builder.writeNumber(source.stakeIndex);
    builder.writeNumber(source.unstakeTime);
    return builder.build();
}

function dictValueParserPendingJettonInfo(): DictionaryValue<PendingJettonInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePendingJettonInfo(src)).endCell());
        },
        parse: (src) => {
            return loadPendingJettonInfo(src.loadRef().beginParse());
        }
    }
}

export type StakedToPending = {
    $$type: 'StakedToPending';
    jettonAmount: bigint;
    stakeIndex: bigint;
}

export function storeStakedToPending(src: StakedToPending) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.stakeIndex, 32);
    };
}

export function loadStakedToPending(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _stakeIndex = sc_0.loadUintBig(32);
    return { $$type: 'StakedToPending' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex };
}

function loadTupleStakedToPending(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    return { $$type: 'StakedToPending' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex };
}

function loadGetterTupleStakedToPending(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    return { $$type: 'StakedToPending' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex };
}

function storeTupleStakedToPending(source: StakedToPending) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.stakeIndex);
    return builder.build();
}

function dictValueParserStakedToPending(): DictionaryValue<StakedToPending> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakedToPending(src)).endCell());
        },
        parse: (src) => {
            return loadStakedToPending(src.loadRef().beginParse());
        }
    }
}

export type PendingToStaked = {
    $$type: 'PendingToStaked';
    jettonAmount: bigint;
    stakeIndex: bigint;
}

export function storePendingToStaked(src: PendingToStaked) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.stakeIndex, 32);
    };
}

export function loadPendingToStaked(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _stakeIndex = sc_0.loadUintBig(32);
    return { $$type: 'PendingToStaked' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex };
}

function loadTuplePendingToStaked(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    return { $$type: 'PendingToStaked' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex };
}

function loadGetterTuplePendingToStaked(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    return { $$type: 'PendingToStaked' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex };
}

function storeTuplePendingToStaked(source: PendingToStaked) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.stakeIndex);
    return builder.build();
}

function dictValueParserPendingToStaked(): DictionaryValue<PendingToStaked> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePendingToStaked(src)).endCell());
        },
        parse: (src) => {
            return loadPendingToStaked(src.loadRef().beginParse());
        }
    }
}

export type StakedInfo = {
    $$type: 'StakedInfo';
    stakedJettons: Dictionary<bigint, StakedJettonInfo>;
    pendingJettons: Dictionary<bigint, PendingJettonInfo>;
}

export function storeStakedInfo(src: StakedInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.stakedJettons, Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo());
        b_0.storeDict(src.pendingJettons, Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo());
    };
}

export function loadStakedInfo(slice: Slice) {
    let sc_0 = slice;
    let _stakedJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), sc_0);
    let _pendingJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), sc_0);
    return { $$type: 'StakedInfo' as const, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons };
}

function loadTupleStakedInfo(source: TupleReader) {
    let _stakedJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), source.readCellOpt());
    let _pendingJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), source.readCellOpt());
    return { $$type: 'StakedInfo' as const, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons };
}

function loadGetterTupleStakedInfo(source: TupleReader) {
    let _stakedJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), source.readCellOpt());
    let _pendingJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), source.readCellOpt());
    return { $$type: 'StakedInfo' as const, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons };
}

function storeTupleStakedInfo(source: StakedInfo) {
    let builder = new TupleBuilder();
    builder.writeCell(source.stakedJettons.size > 0 ? beginCell().storeDictDirect(source.stakedJettons, Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo()).endCell() : null);
    builder.writeCell(source.pendingJettons.size > 0 ? beginCell().storeDictDirect(source.pendingJettons, Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo()).endCell() : null);
    return builder.build();
}

function dictValueParserStakedInfo(): DictionaryValue<StakedInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakedInfo(src)).endCell());
        },
        parse: (src) => {
            return loadStakedInfo(src.loadRef().beginParse());
        }
    }
}

export type StakingData = {
    $$type: 'StakingData';
    index: bigint;
    walletOwner: Address;
    masterAddress: Address;
}

export function storeStakingData(src: StakingData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.index, 64);
        b_0.storeAddress(src.walletOwner);
        b_0.storeAddress(src.masterAddress);
    };
}

export function loadStakingData(slice: Slice) {
    let sc_0 = slice;
    let _index = sc_0.loadUintBig(64);
    let _walletOwner = sc_0.loadAddress();
    let _masterAddress = sc_0.loadAddress();
    return { $$type: 'StakingData' as const, index: _index, walletOwner: _walletOwner, masterAddress: _masterAddress };
}

function loadTupleStakingData(source: TupleReader) {
    let _index = source.readBigNumber();
    let _walletOwner = source.readAddress();
    let _masterAddress = source.readAddress();
    return { $$type: 'StakingData' as const, index: _index, walletOwner: _walletOwner, masterAddress: _masterAddress };
}

function loadGetterTupleStakingData(source: TupleReader) {
    let _index = source.readBigNumber();
    let _walletOwner = source.readAddress();
    let _masterAddress = source.readAddress();
    return { $$type: 'StakingData' as const, index: _index, walletOwner: _walletOwner, masterAddress: _masterAddress };
}

function storeTupleStakingData(source: StakingData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.walletOwner);
    builder.writeAddress(source.masterAddress);
    return builder.build();
}

function dictValueParserStakingData(): DictionaryValue<StakingData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakingData(src)).endCell());
        },
        parse: (src) => {
            return loadStakingData(src.loadRef().beginParse());
        }
    }
}

export type StakeRecord = {
    $$type: 'StakeRecord';
    stakeAddress: Address;
    jettonStakeAmount: bigint;
    stakeTime: bigint;
}

export function storeStakeRecord(src: StakeRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.stakeAddress);
        b_0.storeCoins(src.jettonStakeAmount);
        b_0.storeUint(src.stakeTime, 32);
    };
}

export function loadStakeRecord(slice: Slice) {
    let sc_0 = slice;
    let _stakeAddress = sc_0.loadAddress();
    let _jettonStakeAmount = sc_0.loadCoins();
    let _stakeTime = sc_0.loadUintBig(32);
    return { $$type: 'StakeRecord' as const, stakeAddress: _stakeAddress, jettonStakeAmount: _jettonStakeAmount, stakeTime: _stakeTime };
}

function loadTupleStakeRecord(source: TupleReader) {
    let _stakeAddress = source.readAddress();
    let _jettonStakeAmount = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    return { $$type: 'StakeRecord' as const, stakeAddress: _stakeAddress, jettonStakeAmount: _jettonStakeAmount, stakeTime: _stakeTime };
}

function loadGetterTupleStakeRecord(source: TupleReader) {
    let _stakeAddress = source.readAddress();
    let _jettonStakeAmount = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    return { $$type: 'StakeRecord' as const, stakeAddress: _stakeAddress, jettonStakeAmount: _jettonStakeAmount, stakeTime: _stakeTime };
}

function storeTupleStakeRecord(source: StakeRecord) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.stakeAddress);
    builder.writeNumber(source.jettonStakeAmount);
    builder.writeNumber(source.stakeTime);
    return builder.build();
}

function dictValueParserStakeRecord(): DictionaryValue<StakeRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakeRecord(src)).endCell());
        },
        parse: (src) => {
            return loadStakeRecord(src.loadRef().beginParse());
        }
    }
}

export type TransferEvent = {
    $$type: 'TransferEvent';
    senderAddress: Address;
    jettonAmount: bigint;
}

export function storeTransferEvent(src: TransferEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(378961197, 32);
        b_0.storeAddress(src.senderAddress);
        b_0.storeCoins(src.jettonAmount);
    };
}

export function loadTransferEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 378961197) { throw Error('Invalid prefix'); }
    let _senderAddress = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadCoins();
    return { $$type: 'TransferEvent' as const, senderAddress: _senderAddress, jettonAmount: _jettonAmount };
}

function loadTupleTransferEvent(source: TupleReader) {
    let _senderAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    return { $$type: 'TransferEvent' as const, senderAddress: _senderAddress, jettonAmount: _jettonAmount };
}

function loadGetterTupleTransferEvent(source: TupleReader) {
    let _senderAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    return { $$type: 'TransferEvent' as const, senderAddress: _senderAddress, jettonAmount: _jettonAmount };
}

function storeTupleTransferEvent(source: TransferEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.senderAddress);
    builder.writeNumber(source.jettonAmount);
    return builder.build();
}

function dictValueParserTransferEvent(): DictionaryValue<TransferEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferEvent(src)).endCell());
        },
        parse: (src) => {
            return loadTransferEvent(src.loadRef().beginParse());
        }
    }
}

export type UnStakeEvent = {
    $$type: 'UnStakeEvent';
    receiverAddress: Address;
    jettonAmount: bigint;
    indexId: bigint;
}

export function storeUnStakeEvent(src: UnStakeEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4074084222, 32);
        b_0.storeAddress(src.receiverAddress);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.indexId, 32);
    };
}

export function loadUnStakeEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4074084222) { throw Error('Invalid prefix'); }
    let _receiverAddress = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadCoins();
    let _indexId = sc_0.loadUintBig(32);
    return { $$type: 'UnStakeEvent' as const, receiverAddress: _receiverAddress, jettonAmount: _jettonAmount, indexId: _indexId };
}

function loadTupleUnStakeEvent(source: TupleReader) {
    let _receiverAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _indexId = source.readBigNumber();
    return { $$type: 'UnStakeEvent' as const, receiverAddress: _receiverAddress, jettonAmount: _jettonAmount, indexId: _indexId };
}

function loadGetterTupleUnStakeEvent(source: TupleReader) {
    let _receiverAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _indexId = source.readBigNumber();
    return { $$type: 'UnStakeEvent' as const, receiverAddress: _receiverAddress, jettonAmount: _jettonAmount, indexId: _indexId };
}

function storeTupleUnStakeEvent(source: UnStakeEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.receiverAddress);
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.indexId);
    return builder.build();
}

function dictValueParserUnStakeEvent(): DictionaryValue<UnStakeEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnStakeEvent(src)).endCell());
        },
        parse: (src) => {
            return loadUnStakeEvent(src.loadRef().beginParse());
        }
    }
}

export type UnStakeAllEvent = {
    $$type: 'UnStakeAllEvent';
    receiverAddress: Address;
    jettonAmount: bigint;
}

export function storeUnStakeAllEvent(src: UnStakeAllEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4277164735, 32);
        b_0.storeAddress(src.receiverAddress);
        b_0.storeCoins(src.jettonAmount);
    };
}

export function loadUnStakeAllEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4277164735) { throw Error('Invalid prefix'); }
    let _receiverAddress = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadCoins();
    return { $$type: 'UnStakeAllEvent' as const, receiverAddress: _receiverAddress, jettonAmount: _jettonAmount };
}

function loadTupleUnStakeAllEvent(source: TupleReader) {
    let _receiverAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    return { $$type: 'UnStakeAllEvent' as const, receiverAddress: _receiverAddress, jettonAmount: _jettonAmount };
}

function loadGetterTupleUnStakeAllEvent(source: TupleReader) {
    let _receiverAddress = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    return { $$type: 'UnStakeAllEvent' as const, receiverAddress: _receiverAddress, jettonAmount: _jettonAmount };
}

function storeTupleUnStakeAllEvent(source: UnStakeAllEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.receiverAddress);
    builder.writeNumber(source.jettonAmount);
    return builder.build();
}

function dictValueParserUnStakeAllEvent(): DictionaryValue<UnStakeAllEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnStakeAllEvent(src)).endCell());
        },
        parse: (src) => {
            return loadUnStakeAllEvent(src.loadRef().beginParse());
        }
    }
}

export type AddingJettonAddress = {
    $$type: 'AddingJettonAddress';
    thisContractJettonWallet: Address;
}

export function storeAddingJettonAddress(src: AddingJettonAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3809175851, 32);
        b_0.storeAddress(src.thisContractJettonWallet);
    };
}

export function loadAddingJettonAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3809175851) { throw Error('Invalid prefix'); }
    let _thisContractJettonWallet = sc_0.loadAddress();
    return { $$type: 'AddingJettonAddress' as const, thisContractJettonWallet: _thisContractJettonWallet };
}

function loadTupleAddingJettonAddress(source: TupleReader) {
    let _thisContractJettonWallet = source.readAddress();
    return { $$type: 'AddingJettonAddress' as const, thisContractJettonWallet: _thisContractJettonWallet };
}

function loadGetterTupleAddingJettonAddress(source: TupleReader) {
    let _thisContractJettonWallet = source.readAddress();
    return { $$type: 'AddingJettonAddress' as const, thisContractJettonWallet: _thisContractJettonWallet };
}

function storeTupleAddingJettonAddress(source: AddingJettonAddress) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.thisContractJettonWallet);
    return builder.build();
}

function dictValueParserAddingJettonAddress(): DictionaryValue<AddingJettonAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddingJettonAddress(src)).endCell());
        },
        parse: (src) => {
            return loadAddingJettonAddress(src.loadRef().beginParse());
        }
    }
}

export type Unstake = {
    $$type: 'Unstake';
    indexId: bigint;
}

export function storeUnstake(src: Unstake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3335919492, 32);
        b_0.storeUint(src.indexId, 32);
    };
}

export function loadUnstake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3335919492) { throw Error('Invalid prefix'); }
    let _indexId = sc_0.loadUintBig(32);
    return { $$type: 'Unstake' as const, indexId: _indexId };
}

function loadTupleUnstake(source: TupleReader) {
    let _indexId = source.readBigNumber();
    return { $$type: 'Unstake' as const, indexId: _indexId };
}

function loadGetterTupleUnstake(source: TupleReader) {
    let _indexId = source.readBigNumber();
    return { $$type: 'Unstake' as const, indexId: _indexId };
}

function storeTupleUnstake(source: Unstake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.indexId);
    return builder.build();
}

function dictValueParserUnstake(): DictionaryValue<Unstake> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnstake(src)).endCell());
        },
        parse: (src) => {
            return loadUnstake(src.loadRef().beginParse());
        }
    }
}

export type Redeem = {
    $$type: 'Redeem';
    queryId: bigint;
    projectId: bigint;
}

export function storeRedeem(src: Redeem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3153044278, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.projectId, 16);
    };
}

export function loadRedeem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3153044278) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _projectId = sc_0.loadUintBig(16);
    return { $$type: 'Redeem' as const, queryId: _queryId, projectId: _projectId };
}

function loadTupleRedeem(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _projectId = source.readBigNumber();
    return { $$type: 'Redeem' as const, queryId: _queryId, projectId: _projectId };
}

function loadGetterTupleRedeem(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _projectId = source.readBigNumber();
    return { $$type: 'Redeem' as const, queryId: _queryId, projectId: _projectId };
}

function storeTupleRedeem(source: Redeem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.projectId);
    return builder.build();
}

function dictValueParserRedeem(): DictionaryValue<Redeem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRedeem(src)).endCell());
        },
        parse: (src) => {
            return loadRedeem(src.loadRef().beginParse());
        }
    }
}

export type StakedNotification = {
    $$type: 'StakedNotification';
    from: Address;
    masterAddress: Address;
    amount: bigint;
}

export function storeStakedNotification(src: StakedNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(515376806, 32);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.masterAddress);
        b_0.storeCoins(src.amount);
    };
}

export function loadStakedNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 515376806) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _masterAddress = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'StakedNotification' as const, from: _from, masterAddress: _masterAddress, amount: _amount };
}

function loadTupleStakedNotification(source: TupleReader) {
    let _from = source.readAddress();
    let _masterAddress = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'StakedNotification' as const, from: _from, masterAddress: _masterAddress, amount: _amount };
}

function loadGetterTupleStakedNotification(source: TupleReader) {
    let _from = source.readAddress();
    let _masterAddress = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'StakedNotification' as const, from: _from, masterAddress: _masterAddress, amount: _amount };
}

function storeTupleStakedNotification(source: StakedNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeAddress(source.masterAddress);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserStakedNotification(): DictionaryValue<StakedNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakedNotification(src)).endCell());
        },
        parse: (src) => {
            return loadStakedNotification(src.loadRef().beginParse());
        }
    }
}

export type UnStakedNotification = {
    $$type: 'UnStakedNotification';
    from: Address;
    masterAddress: Address;
    amount: bigint;
}

export function storeUnStakedNotification(src: UnStakedNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2988668404, 32);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.masterAddress);
        b_0.storeCoins(src.amount);
    };
}

export function loadUnStakedNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2988668404) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _masterAddress = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'UnStakedNotification' as const, from: _from, masterAddress: _masterAddress, amount: _amount };
}

function loadTupleUnStakedNotification(source: TupleReader) {
    let _from = source.readAddress();
    let _masterAddress = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'UnStakedNotification' as const, from: _from, masterAddress: _masterAddress, amount: _amount };
}

function loadGetterTupleUnStakedNotification(source: TupleReader) {
    let _from = source.readAddress();
    let _masterAddress = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'UnStakedNotification' as const, from: _from, masterAddress: _masterAddress, amount: _amount };
}

function storeTupleUnStakedNotification(source: UnStakedNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeAddress(source.masterAddress);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserUnStakedNotification(): DictionaryValue<UnStakedNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnStakedNotification(src)).endCell());
        },
        parse: (src) => {
            return loadUnStakedNotification(src.loadRef().beginParse());
        }
    }
}

export type SetUnstakeThreshold = {
    $$type: 'SetUnstakeThreshold';
    queryId: bigint;
    threshold: bigint;
}

export function storeSetUnstakeThreshold(src: SetUnstakeThreshold) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2451488830, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.threshold, 32);
    };
}

export function loadSetUnstakeThreshold(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2451488830) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _threshold = sc_0.loadUintBig(32);
    return { $$type: 'SetUnstakeThreshold' as const, queryId: _queryId, threshold: _threshold };
}

function loadTupleSetUnstakeThreshold(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _threshold = source.readBigNumber();
    return { $$type: 'SetUnstakeThreshold' as const, queryId: _queryId, threshold: _threshold };
}

function loadGetterTupleSetUnstakeThreshold(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _threshold = source.readBigNumber();
    return { $$type: 'SetUnstakeThreshold' as const, queryId: _queryId, threshold: _threshold };
}

function storeTupleSetUnstakeThreshold(source: SetUnstakeThreshold) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.threshold);
    return builder.build();
}

function dictValueParserSetUnstakeThreshold(): DictionaryValue<SetUnstakeThreshold> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetUnstakeThreshold(src)).endCell());
        },
        parse: (src) => {
            return loadSetUnstakeThreshold(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    admin_address: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.admin_address);
        b_0.storeRef(src.jetton_content);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _admin_address = sc_0.loadAddress();
    let _jetton_content = sc_0.loadRef();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin_address = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _admin_address = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, admin_address: _admin_address, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.admin_address);
    builder.writeCell(source.jetton_content);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeJettonMint(src: JettonMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(510630957, 32);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.receiver);
        b_0.storeInt(src.amount, 257);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 510630957) { throw Error('Invalid prefix'); }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonMint(source: JettonMint) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonMint(): DictionaryValue<JettonMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Cell | null;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleJettonBurn(source: JettonBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonExcesses = {
    $$type: 'JettonExcesses';
    query_id: bigint;
}

export function storeJettonExcesses(src: JettonExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadJettonExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function loadTupleJettonExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function loadGetterTupleJettonExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function storeTupleJettonExcesses(source: JettonExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    }
}

export type JettonInternalTransfer = {
    $$type: 'JettonInternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_address: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeJettonInternalTransfer(src: JettonInternalTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_address);
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonInternalTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_address = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_address = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'JettonInternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_address: _response_address, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonInternalTransfer(source: JettonInternalTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_address);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonInternalTransfer(): DictionaryValue<JettonInternalTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonInternalTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadJettonBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleJettonBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadGetterTupleJettonBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    jetton: Address;
    jetton_wallet_code: Cell;
}

export function storeWalletData(src: WalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _jetton = sc_0.loadAddress();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function loadGetterTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _jetton = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, jetton: _jetton, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleWalletData(source: WalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    }
}

export type SetStaticTaxFee = {
    $$type: 'SetStaticTaxFee';
    staticTaxFee: bigint;
}

export function storeSetStaticTaxFee(src: SetStaticTaxFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(352953376, 32);
        b_0.storeCoins(src.staticTaxFee);
    };
}

export function loadSetStaticTaxFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 352953376) { throw Error('Invalid prefix'); }
    let _staticTaxFee = sc_0.loadCoins();
    return { $$type: 'SetStaticTaxFee' as const, staticTaxFee: _staticTaxFee };
}

function loadTupleSetStaticTaxFee(source: TupleReader) {
    let _staticTaxFee = source.readBigNumber();
    return { $$type: 'SetStaticTaxFee' as const, staticTaxFee: _staticTaxFee };
}

function loadGetterTupleSetStaticTaxFee(source: TupleReader) {
    let _staticTaxFee = source.readBigNumber();
    return { $$type: 'SetStaticTaxFee' as const, staticTaxFee: _staticTaxFee };
}

function storeTupleSetStaticTaxFee(source: SetStaticTaxFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.staticTaxFee);
    return builder.build();
}

function dictValueParserSetStaticTaxFee(): DictionaryValue<SetStaticTaxFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetStaticTaxFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetStaticTaxFee(src.loadRef().beginParse());
        }
    }
}

export type UpgradeContract = {
    $$type: 'UpgradeContract';
    queryId: bigint;
    code: Cell | null;
    data: Cell | null;
    responseDestination: Address;
}

export function storeUpgradeContract(src: UpgradeContract) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(288003337, 32);
        b_0.storeInt(src.queryId, 257);
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.responseDestination);
    };
}

export function loadUpgradeContract(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 288003337) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadIntBig(257);
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _responseDestination = sc_0.loadAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function loadTupleUpgradeContract(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    let _responseDestination = source.readAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function loadGetterTupleUpgradeContract(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    let _responseDestination = source.readAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function storeTupleUpgradeContract(source: UpgradeContract) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeAddress(source.responseDestination);
    return builder.build();
}

function dictValueParserUpgradeContract(): DictionaryValue<UpgradeContract> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgradeContract(src)).endCell());
        },
        parse: (src) => {
            return loadUpgradeContract(src.loadRef().beginParse());
        }
    }
}

export type StakingMasterData = {
    $$type: 'StakingMasterData';
    jettonMaster: Address;
    symbol: string;
    name: string;
    image: string;
}

export function storeStakingMasterData(src: StakingMasterData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.jettonMaster);
        b_0.storeStringRefTail(src.symbol);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.image);
    };
}

export function loadStakingMasterData(slice: Slice) {
    let sc_0 = slice;
    let _jettonMaster = sc_0.loadAddress();
    let _symbol = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _image = sc_0.loadStringRefTail();
    return { $$type: 'StakingMasterData' as const, jettonMaster: _jettonMaster, symbol: _symbol, name: _name, image: _image };
}

function loadTupleStakingMasterData(source: TupleReader) {
    let _jettonMaster = source.readAddress();
    let _symbol = source.readString();
    let _name = source.readString();
    let _image = source.readString();
    return { $$type: 'StakingMasterData' as const, jettonMaster: _jettonMaster, symbol: _symbol, name: _name, image: _image };
}

function loadGetterTupleStakingMasterData(source: TupleReader) {
    let _jettonMaster = source.readAddress();
    let _symbol = source.readString();
    let _name = source.readString();
    let _image = source.readString();
    return { $$type: 'StakingMasterData' as const, jettonMaster: _jettonMaster, symbol: _symbol, name: _name, image: _image };
}

function storeTupleStakingMasterData(source: StakingMasterData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.jettonMaster);
    builder.writeString(source.symbol);
    builder.writeString(source.name);
    builder.writeString(source.image);
    return builder.build();
}

function dictValueParserStakingMasterData(): DictionaryValue<StakingMasterData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakingMasterData(src)).endCell());
        },
        parse: (src) => {
            return loadStakingMasterData(src.loadRef().beginParse());
        }
    }
}

export type DeployReStakingMaster = {
    $$type: 'DeployReStakingMaster';
    queryId: bigint;
    data: StakingMasterData;
}

export function storeDeployReStakingMaster(src: DeployReStakingMaster) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(46630970, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.store(storeStakingMasterData(src.data));
    };
}

export function loadDeployReStakingMaster(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 46630970) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _data = loadStakingMasterData(sc_0);
    return { $$type: 'DeployReStakingMaster' as const, queryId: _queryId, data: _data };
}

function loadTupleDeployReStakingMaster(source: TupleReader) {
    let _queryId = source.readBigNumber();
    const _data = loadTupleStakingMasterData(source);
    return { $$type: 'DeployReStakingMaster' as const, queryId: _queryId, data: _data };
}

function loadGetterTupleDeployReStakingMaster(source: TupleReader) {
    let _queryId = source.readBigNumber();
    const _data = loadGetterTupleStakingMasterData(source);
    return { $$type: 'DeployReStakingMaster' as const, queryId: _queryId, data: _data };
}

function storeTupleDeployReStakingMaster(source: DeployReStakingMaster) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeTuple(storeTupleStakingMasterData(source.data));
    return builder.build();
}

function dictValueParserDeployReStakingMaster(): DictionaryValue<DeployReStakingMaster> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployReStakingMaster(src)).endCell());
        },
        parse: (src) => {
            return loadDeployReStakingMaster(src.loadRef().beginParse());
        }
    }
}

export type RestakingFactory$Data = {
    $$type: 'RestakingFactory$Data';
    index: bigint;
    owner: Address;
    masters: Dictionary<Address, StakingMasterData>;
}

export function storeRestakingFactory$Data(src: RestakingFactory$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.index, 64);
        b_0.storeAddress(src.owner);
        b_0.storeDict(src.masters, Dictionary.Keys.Address(), dictValueParserStakingMasterData());
    };
}

export function loadRestakingFactory$Data(slice: Slice) {
    let sc_0 = slice;
    let _index = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let _masters = Dictionary.load(Dictionary.Keys.Address(), dictValueParserStakingMasterData(), sc_0);
    return { $$type: 'RestakingFactory$Data' as const, index: _index, owner: _owner, masters: _masters };
}

function loadTupleRestakingFactory$Data(source: TupleReader) {
    let _index = source.readBigNumber();
    let _owner = source.readAddress();
    let _masters = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserStakingMasterData(), source.readCellOpt());
    return { $$type: 'RestakingFactory$Data' as const, index: _index, owner: _owner, masters: _masters };
}

function loadGetterTupleRestakingFactory$Data(source: TupleReader) {
    let _index = source.readBigNumber();
    let _owner = source.readAddress();
    let _masters = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserStakingMasterData(), source.readCellOpt());
    return { $$type: 'RestakingFactory$Data' as const, index: _index, owner: _owner, masters: _masters };
}

function storeTupleRestakingFactory$Data(source: RestakingFactory$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.owner);
    builder.writeCell(source.masters.size > 0 ? beginCell().storeDictDirect(source.masters, Dictionary.Keys.Address(), dictValueParserStakingMasterData()).endCell() : null);
    return builder.build();
}

function dictValueParserRestakingFactory$Data(): DictionaryValue<RestakingFactory$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRestakingFactory$Data(src)).endCell());
        },
        parse: (src) => {
            return loadRestakingFactory$Data(src.loadRef().beginParse());
        }
    }
}

 type RestakingFactory_init_args = {
    $$type: 'RestakingFactory_init_args';
}

function initRestakingFactory_init_args(src: RestakingFactory_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function RestakingFactory_init() {
    const __code = Cell.fromBase64('te6ccgECGQEABLkAART/APSkE/S88sgLAQIBYgIDAuDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCyPhDAcx/AcoAVSBQI8s/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQAye1UFgQCASAODwPqAZIwf+BwIddJwh+VMCDXCx/eIIIKx4g6uo7EMNMfAYIKx4g6uvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQAdQB0BRDMBBFbBXbPH/gIIIQlGqYtrrjAoIQgZ2+mbrjAjBwBQYHArI0gRFN+EJScMcF8vT4QyPbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFUigQELBwgJAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CwLg0x8BghCBnb6ZuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEkQ02zwxUSPIWYIQMnsrSlADyx/LPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJQzD4QgF/bds8fwoLAMQB0PQEMG0hgRGCAYAQ9A9vofLghwGBEYIiAoAQ9BcCgUNUAYAQ9A9vofLghxKBQ1QBAoAQ9BfIAcj0AMkBzHABygBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHEyFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWM8WyQHMyFADzxbJWMzIWM8WyQHMyUVAUkAgbpUwWfRZMJRBM/QT4gWkghAF9eEAgEDIyVUSBn9VUNs8MAIMABL4QlIgxwXy4IQBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MAwByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIDQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIBARAgFqFBUCEbhsPbPNs8bDGBYSAhG4Ud2zzbPGwxgWEwACIgACIQARsK+7UTQ0gABgAnmxb0g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zxVAts8bDEgbpIwbZkgbvLQgG8kbwTiIG6SMG3egFhcBhu1E0NQB+GPSAAGOKNM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BFUgbBPgMPgo1wsKgwm68uCJ2zwYAJKBAQsiAln0C2+hkjBt3yBukjBtjjPQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQAdQB0BRDMGwUbwTiAAhw+EJt');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRestakingFactory_init_args({ $$type: 'RestakingFactory_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const RestakingFactory_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2296: { message: `JettonWallet: Only Jetton master or Jetton wallet can call this function` },
    4429: { message: `Invalid sender` },
    9739: { message: `Sender is not a Jetton wallet` },
    13105: { message: `JettonWallet: Not enough jettons to transfer` },
    27831: { message: `Only owner can call this function` },
    29133: { message: `JettonWallet: Not allow negative balance after internal transfer` },
    30061: { message: `JettonMaster: Jetton is not mintable` },
    37185: { message: `Not enough funds to transfer` },
    43365: { message: `JettonMaster: Sender is not a Jetton owner` },
    47048: { message: `JettonWallet: Only owner can burn tokens` },
    60354: { message: `JettonWallet: Not enough balance to burn tokens` },
}

const RestakingFactory_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"StakingWalletTemplate$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lockedValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unstakeThreshold","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"stakedJettons","type":{"kind":"dict","key":"int","value":"StakedJettonInfo","valueFormat":"ref"}},{"name":"pendingJettons","type":{"kind":"dict","key":"int","value":"PendingJettonInfo","valueFormat":"ref"}}]},
    {"name":"StakingMasterTemplate$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lockedValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"StakeInternal","header":2652593455,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"UnStake","header":1300905072,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Withdraw","header":1798250141,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"WithdrawInternal","header":3317277393,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Redeposit","header":3316233234,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakeNotification","header":2134781317,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakeReleaseNotification","header":3864453026,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakeRelease","header":1375353473,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettons","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"StakeReleaseJettonInfo","valueFormat":"ref"}},{"name":"jettonsIdx","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenTransferForwardPayload","header":null,"fields":[{"name":"type","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"stakeJetton","type":{"kind":"simple","type":"StakeJetton","optional":true}},{"name":"stakeRelease","type":{"kind":"simple","type":"StakeReleaseNotification","optional":true}}]},
    {"name":"StakeJetton","header":null,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakeReleaseJettonInfo","header":null,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonWithdrawInfo","header":null,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakedJettonInfo","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PendingJettonInfo","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"unstakeTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"StakedToPending","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PendingToStaked","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"StakedInfo","header":null,"fields":[{"name":"stakedJettons","type":{"kind":"dict","key":"int","value":"StakedJettonInfo","valueFormat":"ref"}},{"name":"pendingJettons","type":{"kind":"dict","key":"int","value":"PendingJettonInfo","valueFormat":"ref"}}]},
    {"name":"StakingData","header":null,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"walletOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"masterAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"StakeRecord","header":null,"fields":[{"name":"stakeAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonStakeAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"TransferEvent","header":378961197,"fields":[{"name":"senderAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UnStakeEvent","header":4074084222,"fields":[{"name":"receiverAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"indexId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"UnStakeAllEvent","header":4277164735,"fields":[{"name":"receiverAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AddingJettonAddress","header":3809175851,"fields":[{"name":"thisContractJettonWallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Unstake","header":3335919492,"fields":[{"name":"indexId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Redeem","header":3153044278,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"projectId","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"StakedNotification","header":515376806,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"masterAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UnStakedNotification","header":2988668404,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"masterAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetUnstakeThreshold","header":2451488830,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"threshold","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"admin_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMint","header":510630957,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"JettonInternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SetStaticTaxFee","header":352953376,"fields":[{"name":"staticTaxFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpgradeContract","header":288003337,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"StakingMasterData","header":null,"fields":[{"name":"jettonMaster","type":{"kind":"simple","type":"address","optional":false}},{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DeployReStakingMaster","header":46630970,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"data","type":{"kind":"simple","type":"StakingMasterData","optional":false}}]},
    {"name":"RestakingFactory$Data","header":null,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"masters","type":{"kind":"dict","key":"address","value":"StakingMasterData","valueFormat":"ref"}}]},
]

const RestakingFactory_getters: ABIGetter[] = [
    {"name":"index","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"master","arguments":[{"name":"jettonMaster","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"StakingMasterData","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const RestakingFactory_getterMapping: { [key: string]: string } = {
    'index': 'getIndex',
    'master': 'getMaster',
    'owner': 'getOwner',
}

const RestakingFactory_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeployReStakingMaster"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class RestakingFactory implements Contract {
    
    static async init() {
        return await RestakingFactory_init();
    }
    
    static async fromInit() {
        const init = await RestakingFactory_init();
        const address = contractAddress(0, init);
        return new RestakingFactory(address, init);
    }
    
    static fromAddress(address: Address) {
        return new RestakingFactory(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  RestakingFactory_types,
        getters: RestakingFactory_getters,
        receivers: RestakingFactory_receivers,
        errors: RestakingFactory_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeployReStakingMaster | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployReStakingMaster') {
            body = beginCell().store(storeDeployReStakingMaster(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getIndex(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('index', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMaster(provider: ContractProvider, jettonMaster: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(jettonMaster);
        let source = (await provider.get('master', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleStakingMasterData(result_p) : null;
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}