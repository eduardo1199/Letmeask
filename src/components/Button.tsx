import {ButtonHTMLAttributes} from 'react'; //button html atributos typescript
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
}
    //a propriedade do tipo ButtonProps recebe todas as propriedades do ButtonHTMLAttributes.

export function Button({isOutlined = false, ...props}: ButtonProps){
    return(
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`} 
            {...props}
        />
    );
}