import { Box, Container, Heading, VStack } from "@chakra-ui/layout";

export const FormContainer = ({ children, ...props }) => (
    <VStack spacing={5} align="flex-start" p={5} borderRadius={10} border="2px" borderColor="black" {...props}>
        {children}
    </VStack>
);

export const FormHeading = ({ title, subtitle }) => (
    <Box>
        <Heading size="md" p={0}>{title}</Heading>
        <Container p={0}>
            <span style={{ fontSize: '0.85rem' }}>
                {subtitle}
            </span>
        </Container>
    </Box>
);