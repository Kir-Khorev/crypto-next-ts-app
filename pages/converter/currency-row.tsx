const CurrencyRow = (props: any) => {
    const { currencyOptions, selectedCurrency, onChangeCurrency, } = props;
    if (!currencyOptions) {
        return <div>Load props...</div>
    }

    return (
        <select className="form-select" aria-label="Default select example" onChange={onChangeCurrency} value={selectedCurrency}>
            {
                currencyOptions.map((i: any) => {
                    return <option value={i.values.USD.price} key={i.id}>{i.name}</option>
                })
            }
        </select>
    )
}

export default CurrencyRow;
