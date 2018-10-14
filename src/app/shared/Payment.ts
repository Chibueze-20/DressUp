export interface IRaveOptions {
    PBFPubKey: string;
    txref: string;
    amount: number;
    currency: string;
    country: string;
    customer_email: string;
    customer_firstname: string;
    customer_lastname: string;
    custom_title: string;
    custom_description: string;
    custom_logo: string;
    meta ?: any;
    callback: (response: object) => void;
    onclose: () => void;
}

export class ravePay{
   static paymentOptions: IRaveOptions = null;

  static  setPaymentOptions(PBFPublicKey,transref,amount,customer_email,custom_description,
        callback:(response: object)=> void,onclose?:()=> void,currency?,country?,
        customer_firstname?,customer_lastname?,custom_title?,custom_logo?,meta?){
            ravePay.paymentOptions = {
                PBFPubKey:PBFPublicKey,
                txref: transref,
                amount: amount,
                customer_email: customer_email,
                custom_description:custom_description,
                callback: callback,
                onclose: onclose || function(){alert('closed')},
                currency:currency||'NGN',
                country: country||'NG',
                customer_firstname: customer_firstname||'',
                customer_lastname: customer_lastname||'',
                custom_title: custom_title||'Dress Up',
                custom_logo: custom_logo||'',
                meta: meta||{}
            }
        }
     static  get getPaymentOptions(){
            if (ravePay.paymentOptions){
                return ravePay.paymentOptions;
            } else {
                return null;
            }
        }
}