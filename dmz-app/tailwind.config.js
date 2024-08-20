module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DMZ Sans', 'sans-serif'], // Regular font
        bold: ['DMZ Sans', 'sans-serif'], // Bold weight
        italic: ['DMZ Sans', 'sans-serif'], // Italic style
        light: ['DMZ Sans', 'sans-serif'], // Light weight
        medium: ['DMZ Sans', 'sans-serif'], // Medium weight
        semibold: ['DMZ Sans', 'sans-serif'], // SemiBold weight
        heavy: ['DMZ Sans', 'sans-serif'], // Heavy weight
        roobert: ['Roobert', 'sans-serif'], // Roobert font
      },
      colors: {
        semantic: {
          neutral: {
            '0': '#FFFFFF',
            '1': '#F7F7F7',
            '2': '#E1E1E1',
            '5a': '#999999',
            '7a': '#757575',
            '9a': '#424242',
            '13': '#000000',
          },
          inverted: {
            '0': '#000000',
            '7a': '#757575',
            '9a': '#424242',
          },
          negative: {
            '1': '#FFE6E6',
            '2': '#FFCCCC',
            '8': '#FF3333',
          },
          positive: {
            '1': '#E6FFE6',
            '2': '#CCFFCC',
            '8': '#33CC33',
          },
          warning: {
            '1': '#FFF4E6',
            '2': '#FFCC99',
            '8': '#FF9900',
          },
          informative: {
            '1': '#E6F4FF',
            '2': '#99CCFF',
            '8': '#3399FF',
          },
        },
        global: {
          gray: {
            '1': '#F7F7F7',
            '3': '#E1E1E1',
            '5': '#C4C4C4',
            '7': '#999999',
            '9': '#666666',
            '11': '#333333',
            '13': '#000000',
          },
          purple: {
            '1': '#EAEAEA',
            '3': '#CCCCFF',
            '5a': '#6666FF',
            '7a': '#4242FF',
            '9': '#3333FF',
            '13': '#0000FF',
          },
          blue: {
            '8': '#007BFF',
            '11': '#004085',
          },
          green: {
            '8': '#28A745',
            '11': '#155724',
          },
          orange: {
            '8': '#FFC107',
            '11': '#856404',
          },
          red: {
            '8': '#DC3545',
            '11': '#721C24',
          },
        },
        'dark-text': '#141519',
        'dark-secondary': '#0f1324',
        'light-bg': '#f6f6f7',
        purple: {
          600: 'rgba(116, 29, 226, 1)',  // Custom purple 600
          500: 'rgba(183, 138, 240, 1)', // Custom purple 500
          100: 'rgba(236, 223, 251, 1)', // Custom purple 100
          50: 'rgba(247, 241, 253, 1)',  // Custom purple 50
        },
        gray: {
          900: 'rgba(20, 21, 26, 1)',    // Custom gray 800
          600: 'rgba(15, 19, 36, 0.6)',  // Custom gray 600
          500: 'rgba(13, 17, 38, 0.4)',  // Custom gray 500
          400: 'rgba(10, 15, 41, 0.25)', // Custom gray 400
          10: 'rgba(255, 255, 255, 1)',  // Custom gray 10 (full white)
          100: 'rgba(255, 255, 255, 0.6)', // Custom gray 100
          200: 'rgba(255, 255, 255, 0.46)', // Custom gray 200
        },
      },
      fontSize: {
        '8xl': '96px',  // Display size
        '7xl': '72px',  // H1 size
        '6xl': '64px',  // H2 size
        '5xl': '48px',  // H3 size
        '4xl': '36px',  // H4 size
        '3xl': '30px',  // H5 size
        '2xl': '24px',  // H6 size
        'xl': '20px',   // Body L
        'lg': '18px',   // Body M
        'base': '16px', // Body S
        'sm': '14px',   // Caption L
        'xs': '12px',   // Caption M
        '2xs': '10px',  // Caption S
      },
      lineHeight: {
        '100': '100px',  // Display line height
        '80': '80px',    // H1 line height
        '72': '72px',    // H2 line height
        '56': '56px',    // H3 line height
        '44': '44px',    // H4 line height
        '36': '36px',    // H5 line height
        '32': '32px',    // H6 line height
        '28': '28px',    // Body L line height
        '26': '26px',    // Body M line height
        '24': '24px',    // Body S line height
        '20': '20px',    // Caption L line height
        '16': '16px',    // Caption M line height
        '14': '14px',    // Caption S line height
      },
    },
  },
  plugins: [],
};
