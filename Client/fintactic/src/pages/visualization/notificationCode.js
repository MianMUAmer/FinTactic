addSuccessNotification = () =>
    toast.success(
      "Showing success message was successful!",
      this.state.options
    );

  toggleLocation = (location) => {
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        position: location,
      },
    }));
  };

  addInfoNotification = () => {
    let id = uuid();
    toast.info(
      <div>
        Launching thermonuclear war...
        <Button
          onClick={() => this.launchNotification(id)}
          outline
          size="xs"
          className="width-100 mb-xs mr-xs mt-1"
        >
          Cancel launch
        </Button>
      </div>,
      { ...this.state.options, toastId: id }
    );
  };

  launchNotification = (id) =>
    toast.update(id, {
      ...this.state.options,
      render: "Thermonuclear war averted",
      type: toast.TYPE.SUCCESS,
    });

  addErrorNotification = () => {
    let id = uuid();
    toast.error(
      <div>
        Error destroying alien planet <br />
        <Button
          onClick={() => this.retryNotification(id)}
          outline
          size="xs"
          className="width-100 mb-xs mr-xs mt-1"
        >
          Retry
        </Button>
      </div>,
      { ...this.state.options, toastId: id }
    );
  };

  retryNotification = (id) =>
    toast.update(id, {
      ...this.state.options,
      render: "Alien planet destroyed!",
      type: toast.TYPE.SUCCESS,
    });