import { ButtonContainer } from "./ButtonContainer";

export const SubmitButtonContainer = ({ handleClick, disableSubmit, submitting }) => {
    const buttons = [
        {
            label: 'Reset',
            onClick: handleClick,
        },
        {
            label: 'Search',
            type: 'submit',
            disabled: disableSubmit,
            isLoading: submitting,
        },
    ];
    return (
        <ButtonContainer buttons={buttons} />
    );
};
