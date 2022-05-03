import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/accordion";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Container, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Divider, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useAppContext } from "../appContext";

const groupByBlock = (centers) => {
    const blocks = {};
    centers.forEach(center => {
        const blockName = center.block_name || 'Unnamed';
        if (!blocks[blockName]) {
            blocks[blockName] = [center];
        } else {
            blocks[blockName].push(center);
        }
    });
    return blocks;
}

export default function Results() {
    const [selectedBlock, setBlock] = useState(null);
    const {state} = useAppContext();
    const { isWeekSearch } = state;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

    const centers = useMemo(() => groupByBlock(isWeekSearch ? state.centers : state.sessions), [isWeekSearch, state.centers, state.sessions]);
    const showBlockDetails = (blockName) => {
        setBlock(blockName);
        onOpen();
    };

    console.log(centers[selectedBlock])

    // if (!selectedBlock || !centers[selectedBlock]) {
    //     return null;
    // }

    const blocks = [];
    for (let blockName in centers) {
        blocks.push(
            <Box as="button" h={50} onClick={() => showBlockDetails(blockName)} maxW={360} key={blockName} border="1px" borderRadius="base" borderColor="black" w={'100%'} p={2}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading size="xs">{blockName}</Heading>
                    <Heading size="sm">{centers[blockName].length}</Heading>
                </Flex>
            </Box>
        )
    }
    return (
        <>
        <VStack mt={2} spacing={3} padding="5px 10px" align="center">
            <Text>Centers grouped by Block names</Text>
            {isLargerThan600 ?
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {blocks}
                </Grid>
                :
                blocks
            }
        </VStack>
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            scrollBehavior={'inside'}
            autoFocus={false}
            isCentered
            motionPreset="slideInBottom"
            size={isLargerThan600 ? "" : "full"}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedBlock}</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={isLargerThan600 ? 5 : 0} pt={0}>
                    {centers[selectedBlock] && <Centers centers={centers[selectedBlock]} isWeekSearch={isWeekSearch} />}
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
};

const Centers = ({ centers, isWeekSearch }) => (
    <Accordion defaultIndex={[0]} allowToggle>
        {
            centers.map((center, index) => (
                <AccordionItem w={'100%'} key={`${center.center_id}-${index}`}>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            <Heading mb={2} size="xs">{center.name}</Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <CenterDetails center={center} isWeekSearch={isWeekSearch} />
                </AccordionItem>
            ))
        }
    </Accordion>
);

const CenterDetails = ({ center, isWeekSearch }) => (
    <AccordionPanel>
        <Flex>
            <Address center={center}/>
        </Flex>
        <VStack spacing={2}>
            {
                isWeekSearch ? 
                center.sessions.map((session, i) => <SessionDetails session={session} key={session.session_id}/>)
                :
                <SessionDetails session={center} key={center.session_id}/>
            }
        </VStack>
    </AccordionPanel>
);

const Address = ({ center }) => (
    <Container ml={0} pl={0} mb={2} fontSize="xs">
        {center.address}
        ,&nbsp;
        <strong>{center.pincode}</strong>
    </Container>
);

const SessionDetails = ({ session }) => (
    <>
        <Flex justifyContent="space-between" alignItems="center" w={'100%' }>
            <VStack spacing={5} height={'100%'} width="50%" align="left">
                <Heading size="xs">{session.vaccine}</Heading>
                <Text fontSize="small">Date {session.date}</Text>
                <Text fontSize="small">Capacity {session.available_capacity}</Text>
                <Text fontSize="small">Min. Age {session.min_age_limit}</Text>
            </VStack>
            <SlotsTable slots={session.slots} />
        </Flex>
        <Divider/>
    </>
);

const SlotsTable = ({ slots }) => (
    <Table variant="striped" size="sm" w={'50%'}>
        <Thead>
            <Tr>
                <Th>From</Th>
                <Th>To</Th>
            </Tr>
        </Thead>
        <Tbody>
            {slots.map((slot, i) => {
                const [from, to] = slot.split('-');
                return (
                    <Tr key={`slot-${i}`}>
                        <Td>{from}</Td>
                        <Td>{to}</Td>
                    </Tr>
                )
            })}
        </Tbody>
    </Table>
);