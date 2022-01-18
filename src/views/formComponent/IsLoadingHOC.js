import React, {useState} from 'react';
import {
    Spinner
} from "reactstrap";

export const IsLoadingHOC = (WrappedComponent, loadingMessage) => {
    function HOC(props) {
        const [isLoading, setLoading] = useState(true);
        const setLoadingState = isComponentLoading => {
            setLoading(isComponentLoading);
        };
        return (
            <>
                {
                    isLoading &&
                    <>
                        <Spinner color="light" />
                    </>
                }
                <WrappedComponent {...props} setLoading={setLoadingState}/>
            </>
        );
    }
    return HOC
};
export default IsLoadingHOC;
