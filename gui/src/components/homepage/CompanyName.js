import React from 'react';
import './CompanyName.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const CompanyName = () => {
    return (
        <div className="companyname-container">
            <h2>
                Space
                <br></br>
                Travels
            </h2>
            <h3>
                Let us take You into future
            </h3>

            <Link to="/flights">Book now</Link>

        </div>
    );
}

export default CompanyName;