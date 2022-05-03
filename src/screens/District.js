import { Box, Container, Heading, VStack } from "@chakra-ui/layout";
import DatePicker from "../components/DatePicker";
import { FormContainer, FormHeading } from "../components/SectionComponents";
import { isWeekSearch, useQuery } from '../utils';
import { findByDistrict, findCalendarByDistrict, getDistricts, getStates } from '../apis';
import { useEffect, useState } from "react";
import Selector from "../components/Selector";
import { SubmitButtonContainer } from "../components/SubmitButtonContainer";
import moment from "moment";
import { RESULT_TEXTS } from "../constants";
import { Button } from "@chakra-ui/button";
import { useAppContext } from "../appContext";
import { useHistory } from "react-router";

export default function District() {
    const query = useQuery();
    return (
        <VStack spacing={5} p={5}>
            <SearchSection isWeekSearch={isWeekSearch(query)}/>
        </VStack>
    )
}

const SearchSection = ({ isWeekSearch }) => {
    const history = useHistory();
    const {state, dispatch} = useAppContext();
    const { searchParams = {} } = state;
    const [states, setStates] = useState(null);
    const [stateCode, setStateCode] = useState(searchParams.stateCode);
    const [districtCode, setDistrictCode] = useState(searchParams.districtCode);
    const [districts, setDistricts] = useState([]);
    const [date, setDate] = useState(searchParams.date || new Date());
    const [submitting, setSubmitting] = useState(false);
    const [resultText, setResultText] = useState(RESULT_TEXTS.INITIAL);
    const [centers, setCenters] = useState([]);

    useEffect(() => {
        dispatch({ type: 'update_isWeekSearch', payload: isWeekSearch });
        getStates()
        .then(({ data }) => {
            setStates(data.states.map(o => ({ value: o.state_id, label: o.state_name })))
        })
        .catch((error) => {
            console.error(error);
        })
    }, [isWeekSearch, dispatch]);
    
    useEffect(() => {
        if (stateCode) {
            setDistricts(null);
            getDistricts(stateCode.value)
            .then(({ data }) => {
                setDistricts(data.districts.map(o => ({ value: o.district_id, label: o.district_name })))
            })
            .catch((error) => {
                console.error(error);
            });
        }
        dispatch({ type: 'update_searchParams', payload: { key: 'stateCode', value: stateCode }});
    }, [stateCode, dispatch]);

    useEffect(() => {
        dispatch({ type: 'update_searchParams', payload: { key: 'districtCode', value: districtCode }});
    }, [districtCode, dispatch]);

    useEffect(() => {
        dispatch({ type: 'update_searchParams', payload: { key: 'date', value: date }});
    }, [date, dispatch]);

    useEffect(() => {
        if (isWeekSearch) {
            dispatch({ type: 'update_centers', payload: centers });
        } else {
            dispatch({ type: 'update_sessions', payload: centers });
        }
    }, [isWeekSearch, centers, dispatch]);

    const onStateChange = (value) => setStateCode(value);
    const onDistrictChange = (value) => setDistrictCode(value);
    const onDateChange = (value) => setDate(value);

    const disableSubmit = !stateCode || !districtCode;

    const handleReset = () => {
        setStateCode(null);
        setDistrictCode(null);
        setDate(new Date());
        dispatch({ type: 'reset_searchParams' });
    };

    const handleSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        try {
            setCenters([]);
            setResultText(RESULT_TEXTS.LOADING);
            setSubmitting(true);
            const apiCall = isWeekSearch ? findCalendarByDistrict : findByDistrict;
            const response = await apiCall(districtCode.value, moment(date).format('DD-MM-yyyy'));
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

    const showResultsPage = () => {
        history.push('/results');
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
        <FormContainer>
            <FormHeading
                title="Search By District"
                subtitle={`This will search vaccine sessions available in district for ${isWeekSearch ? 'a week from' : 'a'} selected date.`}
            />
            <Box>
                <Heading size="xs" p={0} mb={3}>State</Heading>
                <Selector
                    options={states || []}
                    isLoading={!states}
                    onChange={onStateChange}
                    value={stateCode}
                    placeholder="Select State"
                />
            </Box>
            <Box>
                <Heading size="xs" p={0} mb={3}>District</Heading>
                <Selector
                    options={districts || []}
                    isLoading={!districts}
                    onChange={onDistrictChange}
                    value={districtCode}
                    placeholder="Select District"
                />
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
            <Button size="md" onClick={showResultsPage}>
                {centers.length} Centers found, Click to see details
            </Button>
        }
        </>
    );
};
