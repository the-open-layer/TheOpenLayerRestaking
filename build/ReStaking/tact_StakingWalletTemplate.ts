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

export type StakeInternal = {
    $$type: 'StakeInternal';
    queryId: bigint;
    jettonWallet: Address;
    jettonAmount: bigint;
    responseDestination: Address;
    forwardAmount: bigint;
    forwardPayload: Cell | null;
    unstakeThreshold: bigint;
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
        b_0.storeUint(src.unstakeThreshold, 32);
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
    let _unstakeThreshold = sc_0.loadUintBig(32);
    return { $$type: 'StakeInternal' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload, unstakeThreshold: _unstakeThreshold };
}

function loadTupleStakeInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _responseDestination = source.readAddress();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    let _unstakeThreshold = source.readBigNumber();
    return { $$type: 'StakeInternal' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload, unstakeThreshold: _unstakeThreshold };
}

function loadGetterTupleStakeInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _responseDestination = source.readAddress();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    let _unstakeThreshold = source.readBigNumber();
    return { $$type: 'StakeInternal' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload, unstakeThreshold: _unstakeThreshold };
}

function storeTupleStakeInternal(source: StakeInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.jettonWallet);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    builder.writeNumber(source.unstakeThreshold);
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
    jettonAmount: bigint;
    jettonWallet: Address;
    forwardPayload: Cell | null;
}

export function storeUnStake(src: UnStake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1300905072, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.jettonWallet);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadUnStake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1300905072) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _jettonAmount = sc_0.loadCoins();
    let _jettonWallet = sc_0.loadAddress();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'UnStake' as const, queryId: _queryId, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function loadTupleUnStake(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'UnStake' as const, queryId: _queryId, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function loadGetterTupleUnStake(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'UnStake' as const, queryId: _queryId, jettonAmount: _jettonAmount, jettonWallet: _jettonWallet, forwardPayload: _forwardPayload };
}

function storeTupleUnStake(source: UnStake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
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
    pendingIndex: bigint;
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
        b_0.storeUint(src.pendingIndex, 32);
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
    let _pendingIndex = sc_0.loadUintBig(32);
    let _tonAmount = sc_0.loadCoins();
    let _forwardAmount = sc_0.loadCoins();
    let _jettonWallet = sc_0.loadAddress();
    let _responseDestination = sc_0.loadAddress();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Withdraw' as const, queryId: _queryId, pendingIndex: _pendingIndex, tonAmount: _tonAmount, forwardAmount: _forwardAmount, jettonWallet: _jettonWallet, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function loadTupleWithdraw(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _responseDestination = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'Withdraw' as const, queryId: _queryId, pendingIndex: _pendingIndex, tonAmount: _tonAmount, forwardAmount: _forwardAmount, jettonWallet: _jettonWallet, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _responseDestination = source.readAddress();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'Withdraw' as const, queryId: _queryId, pendingIndex: _pendingIndex, tonAmount: _tonAmount, forwardAmount: _forwardAmount, jettonWallet: _jettonWallet, responseDestination: _responseDestination, forwardPayload: _forwardPayload };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.pendingIndex);
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
    pendingIndex: bigint;
    forwardAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeRedeposit(src: Redeposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3316233234, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.pendingIndex, 32);
        b_0.storeCoins(src.forwardAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadRedeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3316233234) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _pendingIndex = sc_0.loadUintBig(32);
    let _forwardAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Redeposit' as const, queryId: _queryId, pendingIndex: _pendingIndex, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleRedeposit(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'Redeposit' as const, queryId: _queryId, pendingIndex: _pendingIndex, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleRedeposit(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'Redeposit' as const, queryId: _queryId, pendingIndex: _pendingIndex, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleRedeposit(source: Redeposit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.pendingIndex);
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
    stakeIndex: bigint;
    stakeTime: bigint;
    unstakeThreshold: bigint;
}

export function storeStakedJettonInfo(src: StakedJettonInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.stakeIndex, 32);
        b_0.storeUint(src.stakeTime, 32);
        b_0.storeUint(src.unstakeThreshold, 32);
    };
}

export function loadStakedJettonInfo(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _stakeIndex = sc_0.loadUintBig(32);
    let _stakeTime = sc_0.loadUintBig(32);
    let _unstakeThreshold = sc_0.loadUintBig(32);
    return { $$type: 'StakedJettonInfo' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex, stakeTime: _stakeTime, unstakeThreshold: _unstakeThreshold };
}

function loadTupleStakedJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    let _unstakeThreshold = source.readBigNumber();
    return { $$type: 'StakedJettonInfo' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex, stakeTime: _stakeTime, unstakeThreshold: _unstakeThreshold };
}

function loadGetterTupleStakedJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    let _unstakeThreshold = source.readBigNumber();
    return { $$type: 'StakedJettonInfo' as const, jettonAmount: _jettonAmount, stakeIndex: _stakeIndex, stakeTime: _stakeTime, unstakeThreshold: _unstakeThreshold };
}

function storeTupleStakedJettonInfo(source: StakedJettonInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.stakeIndex);
    builder.writeNumber(source.stakeTime);
    builder.writeNumber(source.unstakeThreshold);
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
    pendingIndex: bigint;
    unstakeTime: bigint;
    unstakeThreshold: bigint;
}

export function storePendingJettonInfo(src: PendingJettonInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.stakeTime, 32);
        b_0.storeUint(src.pendingIndex, 32);
        b_0.storeUint(src.unstakeTime, 32);
        b_0.storeUint(src.unstakeThreshold, 32);
    };
}

export function loadPendingJettonInfo(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _stakeTime = sc_0.loadUintBig(32);
    let _pendingIndex = sc_0.loadUintBig(32);
    let _unstakeTime = sc_0.loadUintBig(32);
    let _unstakeThreshold = sc_0.loadUintBig(32);
    return { $$type: 'PendingJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, pendingIndex: _pendingIndex, unstakeTime: _unstakeTime, unstakeThreshold: _unstakeThreshold };
}

function loadTuplePendingJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    let _unstakeTime = source.readBigNumber();
    let _unstakeThreshold = source.readBigNumber();
    return { $$type: 'PendingJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, pendingIndex: _pendingIndex, unstakeTime: _unstakeTime, unstakeThreshold: _unstakeThreshold };
}

function loadGetterTuplePendingJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _stakeTime = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    let _unstakeTime = source.readBigNumber();
    let _unstakeThreshold = source.readBigNumber();
    return { $$type: 'PendingJettonInfo' as const, jettonAmount: _jettonAmount, stakeTime: _stakeTime, pendingIndex: _pendingIndex, unstakeTime: _unstakeTime, unstakeThreshold: _unstakeThreshold };
}

function storeTuplePendingJettonInfo(source: PendingJettonInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.stakeTime);
    builder.writeNumber(source.pendingIndex);
    builder.writeNumber(source.unstakeTime);
    builder.writeNumber(source.unstakeThreshold);
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
    pendingIndex: bigint;
}

export function storeStakedToPending(src: StakedToPending) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.pendingIndex, 32);
    };
}

export function loadStakedToPending(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _pendingIndex = sc_0.loadUintBig(32);
    return { $$type: 'StakedToPending' as const, jettonAmount: _jettonAmount, pendingIndex: _pendingIndex };
}

function loadTupleStakedToPending(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    return { $$type: 'StakedToPending' as const, jettonAmount: _jettonAmount, pendingIndex: _pendingIndex };
}

function loadGetterTupleStakedToPending(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    return { $$type: 'StakedToPending' as const, jettonAmount: _jettonAmount, pendingIndex: _pendingIndex };
}

function storeTupleStakedToPending(source: StakedToPending) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.pendingIndex);
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
    pendingIndex: bigint;
}

export function storePendingToStaked(src: PendingToStaked) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.pendingIndex, 32);
    };
}

export function loadPendingToStaked(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _pendingIndex = sc_0.loadUintBig(32);
    return { $$type: 'PendingToStaked' as const, jettonAmount: _jettonAmount, pendingIndex: _pendingIndex };
}

function loadTuplePendingToStaked(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    return { $$type: 'PendingToStaked' as const, jettonAmount: _jettonAmount, pendingIndex: _pendingIndex };
}

function loadGetterTuplePendingToStaked(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    return { $$type: 'PendingToStaked' as const, jettonAmount: _jettonAmount, pendingIndex: _pendingIndex };
}

function storeTuplePendingToStaked(source: PendingToStaked) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.pendingIndex);
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
    withdrawalJettons: Dictionary<bigint, WithdrawalJettonInfo>;
}

export function storeStakedInfo(src: StakedInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.stakedJettons, Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo());
        b_0.storeDict(src.pendingJettons, Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo());
        b_0.storeDict(src.withdrawalJettons, Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo());
    };
}

export function loadStakedInfo(slice: Slice) {
    let sc_0 = slice;
    let _stakedJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), sc_0);
    let _pendingJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), sc_0);
    let _withdrawalJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo(), sc_0);
    return { $$type: 'StakedInfo' as const, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons, withdrawalJettons: _withdrawalJettons };
}

function loadTupleStakedInfo(source: TupleReader) {
    let _stakedJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), source.readCellOpt());
    let _pendingJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), source.readCellOpt());
    let _withdrawalJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo(), source.readCellOpt());
    return { $$type: 'StakedInfo' as const, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons, withdrawalJettons: _withdrawalJettons };
}

function loadGetterTupleStakedInfo(source: TupleReader) {
    let _stakedJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), source.readCellOpt());
    let _pendingJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), source.readCellOpt());
    let _withdrawalJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo(), source.readCellOpt());
    return { $$type: 'StakedInfo' as const, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons, withdrawalJettons: _withdrawalJettons };
}

function storeTupleStakedInfo(source: StakedInfo) {
    let builder = new TupleBuilder();
    builder.writeCell(source.stakedJettons.size > 0 ? beginCell().storeDictDirect(source.stakedJettons, Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo()).endCell() : null);
    builder.writeCell(source.pendingJettons.size > 0 ? beginCell().storeDictDirect(source.pendingJettons, Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo()).endCell() : null);
    builder.writeCell(source.withdrawalJettons.size > 0 ? beginCell().storeDictDirect(source.withdrawalJettons, Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo()).endCell() : null);
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

export type WithdrawalJettonInfo = {
    $$type: 'WithdrawalJettonInfo';
    jettonAmount: bigint;
    withdrawTime: bigint;
}

export function storeWithdrawalJettonInfo(src: WithdrawalJettonInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeUint(src.withdrawTime, 32);
    };
}

export function loadWithdrawalJettonInfo(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _withdrawTime = sc_0.loadUintBig(32);
    return { $$type: 'WithdrawalJettonInfo' as const, jettonAmount: _jettonAmount, withdrawTime: _withdrawTime };
}

function loadTupleWithdrawalJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _withdrawTime = source.readBigNumber();
    return { $$type: 'WithdrawalJettonInfo' as const, jettonAmount: _jettonAmount, withdrawTime: _withdrawTime };
}

function loadGetterTupleWithdrawalJettonInfo(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _withdrawTime = source.readBigNumber();
    return { $$type: 'WithdrawalJettonInfo' as const, jettonAmount: _jettonAmount, withdrawTime: _withdrawTime };
}

function storeTupleWithdrawalJettonInfo(source: WithdrawalJettonInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.withdrawTime);
    return builder.build();
}

function dictValueParserWithdrawalJettonInfo(): DictionaryValue<WithdrawalJettonInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawalJettonInfo(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawalJettonInfo(src.loadRef().beginParse());
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

export type StakingWalletTemplate$Data = {
    $$type: 'StakingWalletTemplate$Data';
    owner: Address;
    master: Address;
    staticTax: bigint;
    lockedValue: bigint;
    stakeIndex: bigint;
    pendingIndex: bigint;
    stakedJettons: Dictionary<bigint, StakedJettonInfo>;
    pendingJettons: Dictionary<bigint, PendingJettonInfo>;
    withdrawalJettons: Dictionary<bigint, WithdrawalJettonInfo>;
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
        b_1.storeInt(src.pendingIndex, 257);
        b_1.storeDict(src.stakedJettons, Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo());
        b_1.storeDict(src.pendingJettons, Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo());
        b_1.storeDict(src.withdrawalJettons, Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo());
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
    let _pendingIndex = sc_1.loadIntBig(257);
    let _stakedJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), sc_1);
    let _pendingJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), sc_1);
    let _withdrawalJettons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo(), sc_1);
    return { $$type: 'StakingWalletTemplate$Data' as const, owner: _owner, master: _master, staticTax: _staticTax, lockedValue: _lockedValue, stakeIndex: _stakeIndex, pendingIndex: _pendingIndex, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons, withdrawalJettons: _withdrawalJettons };
}

function loadTupleStakingWalletTemplate$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _staticTax = source.readBigNumber();
    let _lockedValue = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    let _stakedJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), source.readCellOpt());
    let _pendingJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), source.readCellOpt());
    let _withdrawalJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo(), source.readCellOpt());
    return { $$type: 'StakingWalletTemplate$Data' as const, owner: _owner, master: _master, staticTax: _staticTax, lockedValue: _lockedValue, stakeIndex: _stakeIndex, pendingIndex: _pendingIndex, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons, withdrawalJettons: _withdrawalJettons };
}

function loadGetterTupleStakingWalletTemplate$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _staticTax = source.readBigNumber();
    let _lockedValue = source.readBigNumber();
    let _stakeIndex = source.readBigNumber();
    let _pendingIndex = source.readBigNumber();
    let _stakedJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo(), source.readCellOpt());
    let _pendingJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo(), source.readCellOpt());
    let _withdrawalJettons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo(), source.readCellOpt());
    return { $$type: 'StakingWalletTemplate$Data' as const, owner: _owner, master: _master, staticTax: _staticTax, lockedValue: _lockedValue, stakeIndex: _stakeIndex, pendingIndex: _pendingIndex, stakedJettons: _stakedJettons, pendingJettons: _pendingJettons, withdrawalJettons: _withdrawalJettons };
}

function storeTupleStakingWalletTemplate$Data(source: StakingWalletTemplate$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeNumber(source.staticTax);
    builder.writeNumber(source.lockedValue);
    builder.writeNumber(source.stakeIndex);
    builder.writeNumber(source.pendingIndex);
    builder.writeCell(source.stakedJettons.size > 0 ? beginCell().storeDictDirect(source.stakedJettons, Dictionary.Keys.BigInt(257), dictValueParserStakedJettonInfo()).endCell() : null);
    builder.writeCell(source.pendingJettons.size > 0 ? beginCell().storeDictDirect(source.pendingJettons, Dictionary.Keys.BigInt(257), dictValueParserPendingJettonInfo()).endCell() : null);
    builder.writeCell(source.withdrawalJettons.size > 0 ? beginCell().storeDictDirect(source.withdrawalJettons, Dictionary.Keys.BigInt(257), dictValueParserWithdrawalJettonInfo()).endCell() : null);
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
    jettonMaster: Address;
    staticTax: bigint;
    lockedValue: bigint;
    unstakeThreshold: bigint;
}

export function storeStakingMasterTemplate$Data(src: StakingMasterTemplate$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jettonMaster);
        b_0.storeCoins(src.staticTax);
        b_0.storeCoins(src.lockedValue);
        b_0.storeUint(src.unstakeThreshold, 32);
    };
}

export function loadStakingMasterTemplate$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _jettonMaster = sc_0.loadAddress();
    let _staticTax = sc_0.loadCoins();
    let _lockedValue = sc_0.loadCoins();
    let _unstakeThreshold = sc_0.loadUintBig(32);
    return { $$type: 'StakingMasterTemplate$Data' as const, owner: _owner, jettonMaster: _jettonMaster, staticTax: _staticTax, lockedValue: _lockedValue, unstakeThreshold: _unstakeThreshold };
}

function loadTupleStakingMasterTemplate$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _jettonMaster = source.readAddress();
    let _staticTax = source.readBigNumber();
    let _lockedValue = source.readBigNumber();
    let _unstakeThreshold = source.readBigNumber();
    return { $$type: 'StakingMasterTemplate$Data' as const, owner: _owner, jettonMaster: _jettonMaster, staticTax: _staticTax, lockedValue: _lockedValue, unstakeThreshold: _unstakeThreshold };
}

function loadGetterTupleStakingMasterTemplate$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _jettonMaster = source.readAddress();
    let _staticTax = source.readBigNumber();
    let _lockedValue = source.readBigNumber();
    let _unstakeThreshold = source.readBigNumber();
    return { $$type: 'StakingMasterTemplate$Data' as const, owner: _owner, jettonMaster: _jettonMaster, staticTax: _staticTax, lockedValue: _lockedValue, unstakeThreshold: _unstakeThreshold };
}

function storeTupleStakingMasterTemplate$Data(source: StakingMasterTemplate$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jettonMaster);
    builder.writeNumber(source.staticTax);
    builder.writeNumber(source.lockedValue);
    builder.writeNumber(source.unstakeThreshold);
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

 type StakingWalletTemplate_init_args = {
    $$type: 'StakingWalletTemplate_init_args';
    master: Address;
    owner: Address;
}

function initStakingWalletTemplate_init_args(src: StakingWalletTemplate_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.master);
        b_0.storeAddress(src.owner);
    };
}

async function StakingWalletTemplate_init(master: Address, owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckECMAEADOQAAQHAAQEFoIapAgEU/wD0pBP0vPLICwMCAWIEJgN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRjbPPLggi0FJQTE7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEJ4bXS+6jwkw2zxsFwDbPH/gIIIQxam0ErqOpTDTHwGCEMWptBK68uCB0z/TH/oA0gABkdSSbQHiVTBsFADbPH/gIIIQTYo8cLoGBwoMAMDTHwGCEJ4bXS+68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6ANIAAZHUkm0B4tMfVWAC3vhBbyQQI18DUvDHBfLj64EBAfgjJlROAwTIVTBQQ/oCyx8Syx/LH8ksEDsBIG6VMFn0WjCUQTP0FeIKpCHCAJQ4E18D4w0Qil42EFkQOUqacPhBbyQTXwP4J28QAaEooFN4oLYJAaBw+wJwcIMGDAgJAaZwJkUTUGrIVTCCEH8+LYVQBcsfE8s/AfoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiFus5V/AcoAzJRwMsoA4sktRBNQiBAjcAFtbSMB/sgBghDVMnbbWMsfyz/JEE1BMBwQNG1tyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgwVRYkAdoQI18D+EFvJBAjXwNSoMcF8uPrIoEBASJZ9A1voZIwbd8gbpIwbY4R0PoA0x/TH9Mf0x9VQGwVbwXiggDEgiFus/L0UhSBAQH0WjAjIG7y0IBvJV8E+CMFIG7y0IBvJWxBVEgTUGZUQzCBAQEECwCOyFUwUEP6AssfEssfyx/JIxA3ASBulTBZ9FowlEEz9BXiBqRQRMhZWfoCyx/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAECQEvI6/MNMfAYIQTYo8cLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeJVMGwU4CCCEGsvHp26jwkw2zxsFwDbPH/gIIIQ1TJ227oNERIYApgAECNfA/hBbyQQI18DUqDHBfLj6yBw+CMh+CNUEgIqWVOqgQEB9IVvpSCREpUxbTJtAeKQiuhfAzYEggDEhAe+FvL0IcIAkl8F4w1/DhAB/CBukjBtn9D6ANMf0x/TH1UwbBRvBOIgbvLQgG8kLMIAjlhTw7YIUd2hUc2gU9S6m2wiMlIvgQEB9Fowji6BAQFRXqFAQyPIVTBQQ/oCyx8Syx/LH8kCERACVCNAIG6VMFn0WjCUQTP0FeIe4lCKoFA9tgkQjBB4EGcCkl8E4g8ALoEBASICWfR4b6UglALUMFiVMW0ybQHiAKJUIAMVgQEBBchVQFBU+gISyx/LHxLLH8sfySYQNQEgbpUwWfRaMJRBM/QV4lEkyFlZ+gLLH8nIgljAAAAAAAAAAAAAAAABActnzMlw+wADpAMAwNMfAYIQay8enbry4IHTP9Mf+gD6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeJVYAH2+EFvJDAyVhEhxwXy4+uBAQFUSxlZ9A1voZIwbd8gbpIwbY4R0PoA0x/TH9Mf0x9VQGwVbwXiggDEgiFus/L0ggDEgyEgbvLQgG8lFF8EIiBu8tCAbyVsQaD4I77y9IEBASEgbvLQgG8lECRfBEDM9FowU1+gEr7y4+kpEwLkIG7y0IBvJV8EKiBu8tCAbyUQJF8EEIkXFRNJBFAECBESCAcREQcGERAGEF8QThA9TJpw+EFvJBNfA/gnbxABoSigU3igtgkBoHD7AgUREgUEEREEAxEQA0/gf1DtcAuDBg3IVYDbPMkiBBA4RWYQNG1tFBYB9oIQxbmi0VAKyx8Yyz9QBvoCUAT6Alj6AssfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiJusxUAIpZ/AcoAEsyVMnBYygDiyQHMAv7IcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CDCBAQEjIG7y0IBvJRAkXwQEIG7y0IBvJV8EJBcASvgjyFlZ+gLLH8kQNkFAIG6VMFn0WjCUQTP0FeIQOEdgEDVEMBIE/o6WMNMfAYIQ1TJ227ry4IHTPwExANs8f+AgghAVCaQguo6WMNMfAYIQFQmkILry4IH6AAExANs8f+AgghCBnb6Zuo6yMNMfAYIQgZ2+mbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLgIIIQlGqYtroZGyAhAW5VgHD4QW8kE18D+CdvEAGhKKBTeKC2CQGgcPsCcHCDBgzIAYIQ1TJ221jLH8s/ySsEUN0QNG1tGgHQyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgwVQckBI43+EJSkMcF8uPrJshvAAFvjG1vjI0FnNldCBzdGF0aWMgdGF4IGZlZSB0byCDbPAjbPBjbPG8iAcmTIW6zlgFvIlnMyegx0B0cHR4A3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AEE2zwfAlDIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DH4QgF/bds8HyIAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwGwEIpeNhBZEEoQOUqa+EJSkMcF8uCEOFGJyFmCEDJ7K0pQA8sfyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRBoEFcQRhA1RDD4QgF/bds8fyIBuo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAI4q+QGC8AlRkBlK7mEc6JXFUDrfhf2GTeeQV0YUL2CNPrL6rRTkupN/2zHgkTDicCIBNm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQIyMBzMhxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIMCQAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwA2sj4QwHMfwHKAFWAUJgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAE+gJY+gIByIEBAc8AEoEBAc8AEvQAE/QA9ADJAczJ7VQCASAnKAEPviju2eFDZIwtAgEgKSoBD7omrbPCZskYLQIBxyssABCqvu1E0NIAAQESqqPbPFRyEGyTLQH07UTQ1AH4Y9IAAY5i+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA+gDUAdCBAQHXAIEBAdcA9AT0BPQEMBBZEFgQVxBWbBng+CjXCwqDCbry4IkuAYr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEB2zwvABqCCA9CQHBTABBFbW1tULUI8g==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initStakingWalletTemplate_init_args({ $$type: 'StakingWalletTemplate_init_args', master, owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const StakingWalletTemplate_errors: { [key: number]: { message: string } } = {
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

const StakingWalletTemplate_types: ABIType[] = [
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
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"admin_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonMint","header":510630957,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"JettonInternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StakeInternal","header":2652593455,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"unstakeThreshold","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"UnStake","header":1300905072,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Withdraw","header":1798250141,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pendingIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"WithdrawInternal","header":3317277393,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Redeposit","header":3316233234,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pendingIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakeNotification","header":2134781317,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakeReleaseNotification","header":3864453026,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakeRelease","header":1375353473,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettons","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"StakeReleaseJettonInfo","valueFormat":"ref"}},{"name":"jettonsIdx","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenTransferForwardPayload","header":null,"fields":[{"name":"type","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"stakeJetton","type":{"kind":"simple","type":"StakeJetton","optional":true}},{"name":"stakeRelease","type":{"kind":"simple","type":"StakeReleaseNotification","optional":true}}]},
    {"name":"StakeJetton","header":null,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakeReleaseJettonInfo","header":null,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonWithdrawInfo","header":null,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"StakedJettonInfo","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"stakeTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"unstakeThreshold","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PendingJettonInfo","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"pendingIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"unstakeTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"unstakeThreshold","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"StakedToPending","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pendingIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PendingToStaked","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pendingIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"StakedInfo","header":null,"fields":[{"name":"stakedJettons","type":{"kind":"dict","key":"int","value":"StakedJettonInfo","valueFormat":"ref"}},{"name":"pendingJettons","type":{"kind":"dict","key":"int","value":"PendingJettonInfo","valueFormat":"ref"}},{"name":"withdrawalJettons","type":{"kind":"dict","key":"int","value":"WithdrawalJettonInfo","valueFormat":"ref"}}]},
    {"name":"WithdrawalJettonInfo","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"withdrawTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
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
    {"name":"SetStaticTaxFee","header":352953376,"fields":[{"name":"staticTaxFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpgradeContract","header":288003337,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"StakingWalletTemplate$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lockedValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stakeIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pendingIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"stakedJettons","type":{"kind":"dict","key":"int","value":"StakedJettonInfo","valueFormat":"ref"}},{"name":"pendingJettons","type":{"kind":"dict","key":"int","value":"PendingJettonInfo","valueFormat":"ref"}},{"name":"withdrawalJettons","type":{"kind":"dict","key":"int","value":"WithdrawalJettonInfo","valueFormat":"ref"}}]},
    {"name":"StakingMasterTemplate$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonMaster","type":{"kind":"simple","type":"address","optional":false}},{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lockedValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unstakeThreshold","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const StakingWalletTemplate_getters: ABIGetter[] = [
    {"name":"stakedInfo","arguments":[],"returnType":{"kind":"simple","type":"StakedInfo","optional":false}},
    {"name":"staticTaxFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const StakingWalletTemplate_getterMapping: { [key: string]: string } = {
    'stakedInfo': 'getStakedInfo',
    'staticTaxFee': 'getStaticTaxFee',
    'owner': 'getOwner',
}

const StakingWalletTemplate_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"StakeInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Redeposit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UnStake"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonExcesses"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetStaticTaxFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class StakingWalletTemplate implements Contract {
    
    static async init(master: Address, owner: Address) {
        return await StakingWalletTemplate_init(master, owner);
    }
    
    static async fromInit(master: Address, owner: Address) {
        const init = await StakingWalletTemplate_init(master, owner);
        const address = contractAddress(0, init);
        return new StakingWalletTemplate(address, init);
    }
    
    static fromAddress(address: Address) {
        return new StakingWalletTemplate(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  StakingWalletTemplate_types,
        getters: StakingWalletTemplate_getters,
        receivers: StakingWalletTemplate_receivers,
        errors: StakingWalletTemplate_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: StakeInternal | Redeposit | UnStake | Withdraw | JettonExcesses | 'withdraw' | SetStaticTaxFee | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StakeInternal') {
            body = beginCell().store(storeStakeInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Redeposit') {
            body = beginCell().store(storeRedeposit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UnStake') {
            body = beginCell().store(storeUnStake(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonExcesses') {
            body = beginCell().store(storeJettonExcesses(message)).endCell();
        }
        if (message === 'withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetStaticTaxFee') {
            body = beginCell().store(storeSetStaticTaxFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getStakedInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stakedInfo', builder.build())).stack;
        const result = loadGetterTupleStakedInfo(source);
        return result;
    }
    
    async getStaticTaxFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('staticTaxFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}