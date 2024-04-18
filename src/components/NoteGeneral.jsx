import { Outlet, useOutletContext, NavLink } from 'react-router-dom'
import { GridColumn, Grid, MenuMenu, MenuItem, MenuHeader, Menu } from 'semantic-ui-react'


export default function NoteGeneral(){
  const {cardList, setCardList, structure, favorites,setFavorites} = useOutletContext()
  return(
    <>
      <Grid>
        <GridColumn width={3}>
          <Menu vertical>
            {structure.entries().toArray().map(([cat,val])=>(
              <MenuItem key={cat}>
                <MenuHeader>{cat}</MenuHeader>
                <MenuMenu>
                  {val.entries().toArray().map(([top,cards])=>(
                    <MenuItem key={top}>
                      <MenuHeader>{top}</MenuHeader>
                      <MenuMenu>
                        {cards.values().toArray().map(card=>(
                          <MenuItem key={card.id} as={NavLink} to={`/n/${card.id}`} state={{ prev: "gen" }}
                            name={card.title}
                          />
                        ))}
                      </MenuMenu>
                    </MenuItem>
                  ))}
                </MenuMenu>
              </MenuItem>
            ))}
          </Menu>
        </GridColumn>
        <GridColumn width={13}stretched>
          <Outlet context={{cardList, structure, setCardList, favorites, setFavorites}} />
        </GridColumn>
      </Grid>
    </>
  )
}