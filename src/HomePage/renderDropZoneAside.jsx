renderDropZoneAside(){
    return ("<aside>
                          <h2>Dropped files</h2>
                          <ul>
                            {
                              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                            }
                          </ul>
                    </aside>")
}