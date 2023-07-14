export interface SearchBoxProps {
    isLoading? : boolean,
    hint?      : string,
    onSearch?  : (keyword? : string) => void,
}
