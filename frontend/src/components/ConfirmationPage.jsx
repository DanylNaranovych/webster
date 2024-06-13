import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { confirmAccount } from '../store/actions/auth';

const ConfirmationPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const extractTokenFromUrl = () => {
            const url = window.location.pathname;
            const tokenFromUrl = url.substring(url.lastIndexOf('/') + 1);
            if (tokenFromUrl) {
                setToken(tokenFromUrl);
            }
        };

        const simulateConfirmationProcess = async () => {
            try {
                dispatch(confirmAccount(token));
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        extractTokenFromUrl();
        if (token) {
            simulateConfirmationProcess();
        }
    }, [dispatch, token]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center mt-5">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <p>Your email has been successfully confirmed</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
