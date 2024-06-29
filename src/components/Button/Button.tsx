import './button.css'
import './_type/_primary/button_type_primary.css'
import './_type/_secondary/button_type_secondary.css'
import './_type/_tertiary/button_type_tertiary.css'

interface Props {
    text: string;
    styleType?: 'primary' | 'secondary' | 'tertiary';
    onClick?: () => void;
    className?: string;
}

const Button = ({
                    text,
                    styleType = 'primary',
                    onClick,
                    className = ''
                }: Props) => {
    const styleTypeClassName: Map<Props['styleType'], string> = new Map([
        ['primary', 'button_type_primary'],
        ['secondary', 'button_type_secondary'],
        ['tertiary', 'button_type_tertiary']
    ]);

    return (
        <button
            type='button'
            onClick={onClick}
            className={`button ${styleTypeClassName.get(styleType)} ${className}`}
        >
            {text}
        </button>
    )
}

export default Button