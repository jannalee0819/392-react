


const TermButton = ({term, selection, setSelection}) => (
    <div>
      <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
        onChange={() => setSelection(term)} />
      <label className="btn btn-outline-primary btn-lg mb-1 py-2 px-4" htmlFor={term}>
      {term}s
      </label>
    </div>
  );


  const TermSelector = ({selection, setSelection}) => (
    <div className="btn-group gap-2">
        <TermButton key={'Fall'} term={'Fall'} selection={selection} setSelection={setSelection} />
        <TermButton key={'Winter'} term={'Winter'} selection={selection} setSelection={setSelection} />
        <TermButton key={'Spring'} term={'Spring'} selection={selection} setSelection={setSelection} />
    </div>
  );


  export default TermSelector;