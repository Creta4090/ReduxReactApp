import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ThankYou = () => {
    const msg = 'Thank You';
    const [thank, setThank] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            setThank(true);
            clearTimeout(timer);
        }, 3000);
    }, []);

    const redirecttoContacts = () => {
        navigate('/contact');
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>{thank ? "Thank You!" : msg}</h1>
            <p>Your submission has been received.</p>
            <button className="btn btn-primary" onClick={() => redirecttoContacts()}>Click Here to see contacts</button>
          </div>
        </div>
      </div>
    );
}

export default ThankYou;