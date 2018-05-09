const KBankForm = (props) => {
    const keys = [
        { name: 'MERCHANT2' , optional: false },
        { name: 'TERM2' , optional: true },
        { name: 'AMOUNT2' , optional: false },
        { name: 'URL2' , optional: false },
        { name: 'RESPURL' , optional: false },
        { name: 'IPCUST2' , optional: false },
        { name: 'DETAIL2' , optional: false },
        { name: 'INVMERCHANT' , optional: false },
        { name: 'CHECKSUM' , optional: false },
        { name: 'TIMEOUT' , inputName: 'MERTIMEOUT' , optional: true },
    ];
    return (
        <form
            name={props.name}
            method="post"
            action={props.paymentURL}
          >
            {keys.map(key => {
                if(key.optional){
                    if(props.formData[key.name] == null || props.formData[key.name] == undefined){
                        return null;
                    }
                }
                return (<input
                    key={key.name}
                    type="hidden"
                    id={key.name}
                    name={key.inputName || key.name}
                    value={props.formData[key.name]}
                />)
            })}
          </form>
    )
}

export default KBankForm;