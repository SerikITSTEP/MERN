import React from 'react'
import classnames from 'classnames'
import proptype from 'prop-types'

const TextFieldGroup  = ({
    val,
    name,
    placeholder,
    error,
    onChange,
    type
}) => {
    /*console.log(val);
    console.log(name);
    console.log(placeholder);
    console.log(error);
    console.log(onChange);*/
    return(
    <div className="form-field">
        <input value={val} onChange={onChange} name={name} placeholder={placeholder}
               type={type} className={classnames('input', {'is-error': error})}/>
        {error&&(<span className="input-msg-error">{error}</span>)}
    </div>
    )
}

TextFieldGroup.propTypes = {
    val: proptype.string.isRequired,
    name: proptype.string.isRequired,
    placeholder: proptype.string.isRequired,
    error: proptype.string,
    onChange: proptype.func.isRequired,
    type: proptype.string.isRequired

}
TextFieldGroup.defaultProps = {
    type: "text"
}
export default TextFieldGroup;

