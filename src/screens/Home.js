import { Box, Heading, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router";
import PincodeInput from "../components/PincodeInput";
import { FormContainer, FormHeading } from "../components/SectionComponents";
import { ButtonContainer } from "../components/ButtonContainer";

export default function Home() {
    return (
        <VStack spacing={5} p={5}>
            <QuickSearchSection/>
            <DaySessionSection/>
            <WeekSessionSection/>
        </VStack>
    )
}

const QuickSearchSection = () => {
    const [pincode, setPincode] = useState('123456');
    const onPincodeChange = (value) => setPincode(value);
    return (
        <FormContainer>
            <FormHeading
                title="Quick Search"
                subtitle="This will search vaccine sessions available in Pincode area for today."
            />
            <Box>
                <PincodeInput onChange={onPincodeChange} value={pincode}/>
            </Box>
            <Button alignSelf="center" size="md">
                Search
            </Button>
        </FormContainer>
    );
};

const DaySessionSection = () => {
    const history = useHistory();
    const handleClick = (isPincode) => {
        const url = `/${isPincode ? 'pincode' : 'district'}?span=1`;
        history.push(url);
    };
    return (
        <FormContainer w={'100%'}>
            <Heading size="sm">
                Get sessions for specific date by...
            </Heading>
            <SearchButtonContainer handleClick={handleClick}/>
        </FormContainer>
    );
};

const WeekSessionSection = () => {
    const history = useHistory();
    const handleClick = (isPincode) => {
        const url = `/${isPincode ? 'pincode' : 'district'}?span=7`;
        history.push(url);
    };
    return (
        <FormContainer w={'100%'}>
            <Heading size="sm">
                Get sessions for 7 days from specific date by...
            </Heading>
            <SearchButtonContainer handleClick={handleClick}/>
        </FormContainer>
    );
};

const SearchButtonContainer = ({ handleClick }) => {
    const buttons = [
        {
            label: 'PINCODE',
            onClick: () => handleClick(true),
        },
        {
            label: 'District',
            onClick: () => handleClick(false),
        },
    ];
    return (
        <ButtonContainer buttons={buttons}  />
    )
};

