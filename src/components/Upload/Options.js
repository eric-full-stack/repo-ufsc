{!file.uploaded && !file.error && <CircularProgress color="secondary" className={classes.separate}/> }
        {file.url && (
        	<IconButton aria-label="Link" className={classes.separate}>
	     	   <LinkIcon />
		    </IconButton>
		)}
		{file.uploaded && <CheckIcon />}
		{file.error && <ErrorIcon />}
		{file.url && (
			<IconButton aria-label="Delete" className={classes.separate}>
				<DeleteIcon />
			</IconButton>
		)}