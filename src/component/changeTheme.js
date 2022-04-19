export default function ChangeTheme({ updateTheme }) {
    return (
      <>
        <button
          onClick={() => updateTheme("dark")}
        >
          Dark Theme
        </button>
        <button
          onClick={() => updateTheme("light")}
        >
          Light Theme
        </button>
        {/* {props} */}
      </>
  
     );
  }; 