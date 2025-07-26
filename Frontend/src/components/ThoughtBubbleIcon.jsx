const ThoughtBubbleIcon = ({ size = 32, color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main thought bubble */}
      <ellipse
        cx="12"
        cy="10"
        rx="8"
        ry="6"
        fill={color}
        opacity="0.9"
      />
      
      {/* Medium bubble */}
      <circle
        cx="8"
        cy="17"
        r="2"
        fill={color}
        opacity="0.7"
      />
      
      {/* Small bubble */}
      <circle
        cx="6"
        cy="20"
        r="1"
        fill={color}
        opacity="0.5"
      />
      
      {/* Inner highlight for depth */}
      <ellipse
        cx="10"
        cy="8"
        rx="3"
        ry="2"
        fill="white"
        opacity="0.3"
      />
    </svg>
  );
};

export default ThoughtBubbleIcon;
