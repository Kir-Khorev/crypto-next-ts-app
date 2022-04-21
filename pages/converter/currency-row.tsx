import { Preloader } from "../../components-layout/preloader";
import { ICurrencyRow } from "../../interfaces/currency-row";

const CurrencyRow = (props: ICurrencyRow) => {
    const { currencyOptions, selectedCurrency, onChangeCurrency, } = props;

    if (!currencyOptions) return <Preloader />

    return (
        <select className="form-select currencyRow-select" aria-label="Default select example" onChange={onChangeCurrency} value={selectedCurrency}>
            {
                currencyOptions.map((i: any) => {
                    return <option value={i.values.USD.price} key={i.id}>{i.name}</option>
                })
            }
        </select>
    )
}

export default CurrencyRow;
