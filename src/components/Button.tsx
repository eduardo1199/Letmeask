import {ButtonHTMLAttributes} from 'react'; //button html atributos typescript
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> //a propriedade do tipo ButtonProps recebe todas as propriedades do ButtonHTMLAttributes.

export function Button(props: ButtonProps){
    return(
        <button className={props.className} type={props.type} {...props}/>
    );
}