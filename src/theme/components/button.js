export const button = {
  baseStyle: {
    borderRadius: "none",
    fontWeight: "regular",
    _disabled: {
      _hover: {
        bg: "#050047 !important",
      },
    },
  },
  defaultProps: {
    variant: "primary",
    size: "md",
  },
  variants: {
    primary: {
      backgroundColor: "#f1592a",
      color: "#fff",
      borderRadius: '9px',
      marginBottom: '10px'
    },
    secondary: {
      backgroundColor: "red",
      color: "white",
    },
  },
};
