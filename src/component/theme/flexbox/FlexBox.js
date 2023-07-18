const FlexBox = ({ children, justifyContent, ...props }) => {
    return (
      <div
        {...props}
        style={{
          justifyContent:
            justifyContent !== undefined ? justifyContent : "space-between",
          display: "flex",
          alignItems: "center"
        }}
      >
        {children}
      </div>
    )
  }
  
  export default FlexBox
  