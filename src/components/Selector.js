import Select from 'react-select';

const Selector = ({ options, isLoading, value, onChange, ...props }) => (
    <Select
        style={{ minWidth: 200 }}
        value={value}
        onChange={onChange}
        options={options}
        isLoading={isLoading}
        className="react-select"
        {...props}
    />
);

export default Selector;