import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

export const ButtonContainer = ({ buttons: [btn1, btn2] }) => (
    <Flex justifyContent="space-between" alignItems="stretch" w={'100%'}>
        <Button onClick={btn1.onClick} w={'45%'} size="md" disabled={btn1.disabled || false}>
            {btn1.label}
        </Button>
        <Button w={'45%'} {...(btn2.type === 'submit' ? {} : { onClick: btn2.onClick })} size="md" disabled={btn2.disabled || false} isLoading={btn2.isLoading} type={btn2.type || 'default'}>
            {btn2.label}
        </Button>
    </Flex>
);
