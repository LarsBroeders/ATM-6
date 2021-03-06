events.listen('recipes', function (e) {
  function unifyMetal(name, ingotItem, dustItem, blockItem, nuggetItem) {
    e.replaceOutput('#forge:ingots/' + name, ingotItem)
    e.replaceOutput('#forge:dusts/' + name, dustItem)
    e.replaceOutput('#forge:nuggets/' + name, nuggetItem)
    e.replaceOutput('#forge:storage_blocks/' + name, blockItem)
    e.remove({
      intput: ['#forge:ores/' + name, '#forge:dusts/' + name],
      output: '#forge:ingots/' + name,
      type: 'minecraft:smelting'
    })
    e.remove({
      intput: ['#forge:ores/' + name, '#forge:dusts/' + name],
      output: '#forge:ingots/' + name,
      type: 'minecraft:blasting'
    })
    e.recipes.minecraft.smelting(ingotItem, '#forge:dusts/' + name).xp(.5)
    e.recipes.minecraft.blasting(ingotItem, '#forge:dusts/' + name).xp(.5)
    e.recipes.pedestals.pedestal_crushing({
      ingredient: {
        tag: 'forge:ingots/' + name
      },
      result: {
        item: dustItem,
        count: 1
      }
    })
    e.remove({
      id: 'appliedenergistics2:grinder/' + name + '_dust_ingot'
    })
    e.recipes.appliedenergistics2.grinder({
      input: {
        tag: 'forge:ingots/' + name
      },
      result: {
        primary: {
          item: dustItem,
          count: 1
        }
      },
      turns: 8
    })
    //If unifiable item doesn't have an ore, add it below
    if (name !== 'steel' && name !== 'bronze') {
      e.recipes.minecraft.smelting(ingotItem, '#forge:ores/' + name).xp(1)
      e.recipes.minecraft.blasting(ingotItem, '#forge:ores/' + name).xp(1)
      e.recipes.mekanism.enriching(item.of(dustItem, 2), '#forge:ores/' + name)
      //This is here to stop crushing hammer recipes for modium from generating
      if (name !== 'allthemodium' && name !== 'vibranium' && name !== 'unobtainium') {
        e.remove({
          id: 'engineerstools:crushing/' + name + '_grit_crushing_recipe'
        })
        e.recipes.engineerstools.crafting_extended_shapeless({
          group: 'grit',
          ingredients: [{
              tag: 'forge:ores/' + name
            },
            {
              item: 'engineerstools:crushing_hammer'
            }
          ],
          result: {
            item: dustItem,
            count: 2
          },
          aspects: {
            tool: 'engineerstools:crushing_hammer',
            tool_damage: 25
          }
        })
      }
      e.remove({
        id: 'pedestals:pedestal_crushing/dust' + name
      })
      e.recipes.pedestals.pedestal_crushing({
        ingredient: {
          tag: 'forge:ores/' + name
        },
        result: {
          item: dustItem,
          count: 2
        }
      })
      e.remove({
        id: 'appliedenergistics2:grinder/' + name + '_dust_ore'
      })
      e.recipes.appliedenergistics2.grinder({
        input: {
          tag: 'forge:ores/' + name
        },
        result: {
          primary: {
            item: dustItem,
            count: 2
          }
        },
        turns: 8
      })
    }
  }
  e.remove({
    id: 'engineerstools:crushing/aluminium_grit_crushing_recipe'
  })

  unifyMetal('iron', 'minecraft:iron_ingot', 'alltheores:iron_dust', 'minecraft:iron_block', 'minecraft:iron_nugget')
  unifyMetal('gold', 'minecraft:gold_ingot', 'alltheores:gold_dust', 'minecraft:gold_block', 'minecraft:gold_nugget')
  unifyMetal('aluminum', 'alltheores:aluminum_ingot', 'alltheores:aluminum_dust', 'alltheores:aluminum_block', 'alltheores:aluminum_nugget')
  unifyMetal('uranium', 'alltheores:uranium_ingot', 'alltheores:uranium_dust', 'alltheores:uranium_block', 'alltheores:uranium_nugget')
  unifyMetal('copper', 'alltheores:copper_ingot', 'alltheores:copper_dust', 'alltheores:copper_block', 'alltheores:copper_nugget')
  unifyMetal('tin', 'alltheores:tin_ingot', 'alltheores:tin_dust', 'alltheores:tin_block', 'alltheores:tin_nugget')
  unifyMetal('silver', 'alltheores:silver_ingot', 'alltheores:silver_dust', 'alltheores:silver_block', 'alltheores:silver_nugget')
  unifyMetal('lead', 'alltheores:lead_ingot', 'alltheores:lead_dust', 'alltheores:lead_block', 'alltheores:lead_nugget')
  unifyMetal('nickel', 'alltheores:nickel_ingot', 'alltheores:nickel_dust', 'alltheores:nickel_block', 'alltheores:nickel_nugget')
  unifyMetal('zinc', 'alltheores:zinc_ingot', 'alltheores:zinc_dust', 'alltheores:zinc_block', 'alltheores:zinc_nugget')
  unifyMetal('platinum', 'alltheores:platinum_ingot', 'alltheores:platinum_dust', 'alltheores:platinum_block', 'alltheores:platinum_nugget')
  unifyMetal('osmium', 'alltheores:osmium_ingot', 'alltheores:osmium_dust', 'alltheores:osmium_block', 'alltheores:osmium_nugget')
  unifyMetal('allthemodium', 'allthemodium:allthemodium_ingot', 'allthemodium:allthemodium_dust', 'allthemodium:allthemodium_block', 'allthemodium:allthemodium_nugget')
  unifyMetal('vibranium', 'allthemodium:vibranium_ingot', 'allthemodium:vibranium_dust', 'allthemodium:vibranium_block', 'allthemodium:vibranium_nugget')
  unifyMetal('unobtainium', 'allthemodium:unobtainium_ingot', 'allthemodium:unobtainium_dust', 'allthemodium:unobtainium_block', 'allthemodium:unobtainium_nugget')
  unifyMetal('steel', 'mekanism:ingot_steel', 'mekanism:dust_steel', 'mekanism:block_steel', 'mekanism:nugget_steel')
  unifyMetal('bronze', 'mekanism:ingot_bronze', 'mekanism:dust_bronze', 'mekanism:block_bronze', 'mekanism:nugget_bronze')
  unifyMetal('azure_silver', 'silentgear:azure_silver_ingot', 'silentgear:azure_silver_dust', 'silentgear:azure_silver_block', 'silentgear:azure_silver_nugget')
  unifyMetal('crimson_iron', 'silentgear:crimson_iron_ingot', 'silentgear:crimson_iron_dust', 'silentgear:crimson_iron_block', 'silentgear:crimson_iron_nugget')
})