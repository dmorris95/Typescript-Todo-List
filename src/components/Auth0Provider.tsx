import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithNavigateProps = {
    children: any;
};

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({
    children,
}) => {
    const navigate = useNavigate();
    const domain = "dev-hb6l8tds2m1htqko.us.auth0.com"; // your-domain-from-auth0-application-dashboard
    const clientId = "wIq7YVnUhsz0Txtn1neXU5pA7mkcJ0sx"; // Client Id from Auth0 applciation dashboard
    const redirectUri = "http://localhost:3000/callback"; // A Callback dedicated to catching errors, authorizing tokens

    const onRedirectCallback = (appState: any) => {
        navigate((appState && appState.returnTo) || window.location.pathname);
                // First try to navigate the user to where they want. Otherwise return them to where they came from
    };

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                scope: "openid profile email",
            }}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
            >
                {children}
            </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;