select incidents.id, state, injuries.name as injury, affectedareas.name as affectedarea, causes.name as causes from incidents
join injuries on incidents.injuryId = injuries.id
join affectedareas on injuries.affectedareaid = affectedareas.id
join causes on incidents.causeid = causes.id