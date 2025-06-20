/** @type {import('tailwindcss').Config} */

// spacing from 1 to 1000
function generateSpacing() {
  const spacing = {};
  for (let i = 0; i <= 1000; i++) {
    spacing[i] = `${i}px`;
  }
  return spacing;
}

// fontSize from 1 to 100
function generateFontSizes() {
  const fontSize = {};
  for (let i = 1; i <= 100; i++) {
    fontSize[i] = `${i}px`;
  }
  return fontSize;
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        custom: {
          red: "var(--red-color)",
          blue: "var(--blue-color)",
          green: "var(--green-color)",
          gray: "var(--gray-color)",
        },

        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        bg: {
          body: "var(--bg-body)",
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          button: "var(--bg-button)",
        },
      },
      screens: {
        // Breakpoints standards (min-width)
        sm: "550px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "2050px",
      },
      fontSize: generateFontSizes(),
      spacing: generateSpacing(),
      letterSpacingPercentages: {
        "neg-8": -0.08, // -8%
        "neg-5": -0.05, // -5%
        "pos-4": 0.04, // +4%
        "pos-8": 0.08, // +8%
      },
    },

    fontFamily: {
      poppins: ["Poppins", "sans serif"],
    },

    transitionTimingFunction: {
      "smooth-out": "cubic-bezier(.39, .575, .28, .995)",
      smooth: "cubic-bezier(.65, 0, .35, 1)",
      "smooth-slow": "cubic-bezier(.33,.14,.69,.84)",
      bounce: "cubic-bezier(0.17,0.67,0.3,1.33)",
    },
  },
  plugins: [
    function ({ addUtilities, theme, e }) {
      const fontSize = theme("fontSize");
      const percentages = theme("letterSpacingPercentages");

      const utilities = {};

      Object.entries(fontSize).forEach(([sizeKey, sizeValue]) => {
        const size = parseInt(sizeValue);

        Object.entries(percentages).forEach(([percentKey, percentValue]) => {
          const letterSpacingValue = `${Math.round(percentValue * size * 100) / 100}px`;

          utilities[`.tracking-${percentKey}-${sizeKey}`] = {
            "letter-spacing": letterSpacingValue,
          };
          utilities[`.text-${sizeKey}-${percentKey}`] = {
            "font-size": sizeValue,
            "letter-spacing": letterSpacingValue,
          };
        });
      });

      addUtilities(utilities);
    },

    function ({ matchUtilities, theme }) {
      const percentages = theme("letterSpacingPercentages");

      Object.entries(percentages).forEach(([percentKey, percentValue]) => {
        matchUtilities(
          {
            [`text-${percentKey}`]: (value) => {
              const sizeMatch = value.match(/(\d+)px/);
              if (!sizeMatch) return {};

              const size = parseInt(sizeMatch[1]);
              const letterSpacingValue = `${Math.round(percentValue * size * 100) / 100}px`;

              return {
                "font-size": value,
                "letter-spacing": letterSpacingValue,
              };
            },
          },
          { values: theme("fontSize") }
        );
      });
    },
  ],
};
