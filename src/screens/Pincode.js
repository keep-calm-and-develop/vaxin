import { Box, Container, Heading, VStack } from "@chakra-ui/layout";
import { useState } from "react";
import DatePicker from "../components/DatePicker";
import PincodeInput from "../components/PincodeInput";
import { FormContainer, FormHeading } from "../components/SectionComponents";
import { isWeekSearch, useQuery } from '../utils';
import { SubmitButtonContainer } from "../components/SubmitButtonContainer";
import moment from "moment";
import { findByPin, findCalendarByPin } from "../apis";
import { Button } from "@chakra-ui/button";
import { RESULT_TEXTS } from "../constants";

export default function Pincode() {
    const query = useQuery();
    return (
        <VStack spacing={5} p={5}>
            <SearchSection isWeekSearch={isWeekSearch(query)}/>
        </VStack>
    )
}

const SearchSection = ({ isWeekSearch }) => {
    const [date, setDate] = useState(new Date());
    const [pincode, setPincode] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [resultText, setResultText] = useState(RESULT_TEXTS.INITIAL);
    const [centers, setCenters] = useState([]);

    const onPincodeChange = (value) => setPincode(value);
    const onDateChange = (value) => setDate(value);

    const handleReset = () => {
        setPincode(null);
        setDate(new Date());
    };

    const handleSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        try {
            setCenters([]);
            setSubmitting(true);
            setResultText(RESULT_TEXTS.LOADING);
            const apiCall = isWeekSearch ? findCalendarByPin : findByPin;
            const response = await apiCall(pincode, moment(date).format('DD-MM-yyyy'));
            const { centers, sessions } = response.data;
            const data = isWeekSearch ? centers : sessions;
            if (data?.length) {
                setCenters(data);
                setResultText(RESULT_TEXTS.FOUND);
            } else {
                setResultText(RESULT_TEXTS.NOT_FOUND);
            }
        } catch (error) {
            console.error(error);
            setResultText(RESULT_TEXTS.NOT_FOUND);
        } finally {
            setSubmitting(false)
        }
    };

    const disableSubmit = !pincode;
    return (
        <>
        <form onSubmit={handleSubmit}>
        <FormContainer>
            <FormHeading
                title="Search By PINCODE"
                subtitle={`This will search vaccine sessions available in Pincode area for ${isWeekSearch ? 'a week from' : 'a'} selected date.`}
            />
            <Box>
                <Heading size="xs" p={0} mb={3}>PINCODE</Heading>
                <PincodeInput onChange={onPincodeChange} value={pincode}/>
            </Box>
            <Box>
                <Heading size="xs" p={0} mb={1}>Date</Heading>
                <DatePicker onChange={onDateChange} value={date} />
            </Box>
            <SubmitButtonContainer handleClick={handleReset} disableSubmit={disableSubmit} submitting={submitting}/>
        </FormContainer>
        </form>
        {
            resultText !== ''
            ?
            <Container>
                {resultText}
            </Container>
            :
            <Button size="md">
                {centers.length} Centers found, Click to see details
            </Button>
        }
        </>
    )
};

