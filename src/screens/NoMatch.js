import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

export default function NoMatch() {
    const history = useHistory();
    const goBack = e  => {
        e.preventDefault();
        e.stopPropagation();
        history.goBack();
    }
    return (
        <VStack spacing={4} mt={5}>
            <Heading>
                Oops! Page Not Found
            </Heading>
            <FontAwesomeIcon color="black" icon="syringe" size="5x"/>
            <Container textAlign="center">
                You may have lost, but can win battle with Covid-19.
                Lets get Vaccinated.
            </Container>
            <Button onClick={goBack}>
                Go back where you started
            </Button>
        </VStack>
    );
}