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
      borderRadius: "9px",
      marginBottom: "10px",
    },
    secondary: {
      backgroundColor: "#f7f7f7",
      color: "#888da8",
      borderRadius: "50px",
    },
    publish: {
      backgroundColor: "#f1592a",
      color: "#fff",

      borderRadius: "50px",
    },
  },
};
