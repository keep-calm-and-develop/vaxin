import { HStack } from "@chakra-ui/layout";
import { PinInput, PinInputField } from "@chakra-ui/react";

const PincodeInput = ({ onChange, value }) => {
    const color = 'black';
    return (
        <HStack>
            <PinInput onChange={onChange} value={value}>
                <PinInputField borderColor={color}/>
                <PinInputField borderColor={color}/>
                <PinInputField borderColor={color}/>
                <PinInputField borderColor={color}/>
                <PinInputField borderColor={color}/>
                <PinInputField borderColor={color}/>
            </PinInput>
        </HStack>
    );
};

export default PincodeInput;