import {useState, useEffect} from 'react';

const useLengthValidation = (value, minLength) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (value.length > 0 && value.length < minLength) {
            setMessage(`Value must be at least ${minLength} characters long!`);
        } else {
            setMessage('');
        }
    }, [value, minLength]);

    return [message, setMessage];
};

export default useLengthValidation;