function ColorPalettePage() {
  return (
    <div>
      <div className="h-24 bg-background text-foreground text-5xl place-items-center justify-center flex">
        BACKGROUND
      </div>
      <div className="h-24 bg-card text-card-foreground text-5xl place-items-center justify-center flex">
        CARD
      </div>
      <div className="h-24 bg-primary text-primary-foreground text-5xl place-items-center justify-center flex">
        PRIMARY
      </div>
      <div className="h-24 bg-popover text-popover-foreground text-5xl place-items-center justify-center flex">
        POPOVER
      </div>
      <div className="h-24 bg-secondary text-secondary-foreground text-5xl place-items-center justify-center flex">
        SECONDARY
      </div>
      <div className="h-24 bg-muted text-muted-foreground text-5xl place-items-center justify-center flex">
        MUTED
      </div>
      <div className="h-24 bg-accent text-accent-foreground text-5xl place-items-center justify-center flex">
        ACCENT
      </div>
      <div className="h-24 bg-destructive text-destructive-foreground text-5xl place-items-center justify-center flex">
        DESTRUCTIVE
      </div>
      <div className="h-24 bg-border text-white text-5xl place-items-center justify-center flex">
        BORDER
      </div>
      <div className="h-24 bg-input text-white text-5xl place-items-center justify-center flex">
        INPUT
      </div>
      <div className="h-24 bg-ring text-white text-5xl place-items-center justify-center flex">
        RING
      </div>
    </div>
  );
}

export default ColorPalettePage;
