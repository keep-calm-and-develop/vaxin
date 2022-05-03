import { Button, Flex, Heading } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useLocation } from "react-router-dom";

export default function Header() {
    const { pathname } = useLocation();
    const history = useHistory();
    const goBack = e  => {
        e.preventDefault();
        e.stopPropagation();
        if (pathname.includes('results')) {
            history.goBack();
        } else {
            history.replace('/');
        }
    };

    let backButton = null;
    if (pathname === '/results') {
        backButton = (
            <Button className="back-btn" onClick={goBack} size="lg" variant="link">
                <Heading size="lg" m={0}>
                    <FontAwesomeIcon color="black" icon="arrow-left" />
                </Heading>
            </Button>
        );
    } else if (pathname !== '/') {
        backButton = (
            <Button className="back-btn" onClick={goBack} size="lg" variant="link">
                <Heading size="lg" m={0}>
                    <FontAwesomeIcon color="black" icon="home" />
                </Heading>
            </Button>
        );
    }
    return (
        <Flex boxShadow={"lg"} pt={2} pb={2} pl={15} pr={15} alignItems="center" justifyContent="space-between">
            <Heading m={0}>Vaxin</Heading>
            {backButton}
        </Flex>
    );
}