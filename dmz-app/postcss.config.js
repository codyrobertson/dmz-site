import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';

export default {
  plugins: [
    postcssImport,
    tailwindcss,
    autoprefixer,
    cssnano({
      preset: 'default',
    }),
  ],
};
