interface ListWrapperProps extends React.HTMLProps<HTMLLIElement> {
  children: React.ReactNode;
}

export const ListWrapper = ({ children, ...props }: ListWrapperProps) => {
  return <li {...props} className='shrink-0 h-full w-[272px] select-none'>{children}</li>;
};
