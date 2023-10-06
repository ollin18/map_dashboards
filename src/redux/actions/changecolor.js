  const changeColor = useCallback(event => {
    if (event) {
      setMapStyle(constants.DARK_MAP)
    } else {
      setMapStyle(constants.LIGHT_MAP)
    }
  })