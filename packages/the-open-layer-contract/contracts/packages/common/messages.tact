// -------------------------------------
// Custom messages
// -------------------------------------

// SetStaticTaxFee is the message that used to set the static tax fee.
message(0x1509a420) SetStaticTaxFee {
    staticTaxFee: Int as coins;
}

message(0x112a9509) UpgradeContract {
    queryId: Int;
    code: Cell?;
    data: Cell?;
    responseDestination: Address;
}
