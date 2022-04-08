const CurrencyRow = (props: any) => {
    const { currencyOptions, selectedCurrency, onChangeCurrency, } = props;
    return (
        <div className='currencySelect currencySelectWrapper' value={selectedCurrency} onChange={onChangeCurrency}>
            <select className="form-select" aria-label="Default select example">
                {
                    currencyOptions.map((i: any) => {
                        return <option value={i.values.USD.price} key={i.id}>{i.name}</option>
                    })
                }
            </select>
        </div>
    )
}

export default CurrencyRow;
