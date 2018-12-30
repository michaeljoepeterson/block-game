import React from 'react';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="form-error">{this.props.meta.error}</div>;
        }
        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta.warning}</div>
            );
        }
        //used for disabling/enabling keyboard on mobile/pc
        /*

        let onkeydown;
       let isAndroid = navigator.userAgent.toLowerCase().match(/android\s[0-9].[0-9]/);
       let isIOS = !!navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
       if(this.props.max){
            onkeydown = (e)=> { 
                e.preventDefault(); 
                e.stopPropagation(); 
            }
       }
       if(isAndroid ||  isIOS){
        onkeydown = null;
       }
       */
        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <input
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                    max={this.props.max}
                    min={this.props.min}
                    className={this.props.className}
                />
            </div>
        );
    }
}