module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },

    extend: {
      colors: {
        brand: {
          primary: {
            light: "#5C16C5",
            dark: "#2D0C5E",
          },
          secondary: "#D18000",
          neutral: {
            "000": "#FFFFFF",
            300: "#DDDDDD",
            500: "#646464",
            700: "#323232",
            900: "#131313",
          },
        },
      },
      fontSize: {
        "3xl": ["1.75rem", "2.25rem"], // 28px
        "4xl": ["2rem", "2.5rem"], // 32px
        "5xl": ["3rem", "1"], // 48px
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, bottom: 0 },
          to: { opacity: 1, bottom: "2rem" },
        },
        fadeOut: {
          from: { opacity: 1, bottom: "2rem" },
          to: { opacity: 0, bottom: 0 },
        },
      },
      animation: {
        fadeInOut: "fadeIn .300s, fadeOut .300s 4s forwards",
      },
    },
  },
  plugins: [],
};
