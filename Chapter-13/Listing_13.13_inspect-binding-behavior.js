const interceptMethods = ['updateTarget', 'updateSource', 'callSource'];

export class InspectBindingBehavior {
  bind(binding, scope, interceptor) {

    let name = binding.targetObserver ? binding.targetObserver.constructor.name : binding.constructor.name;
    let currentBindings = scope.overrideContext["bindings"] || [];
    
    currentBindings.push({
                          "type" : name, 
                          "source" : binding.targetProperty, 
                          "target": binding.target.nodeName, 
                          "mode" : binding.mode
                         });
    
    scope.overrideContext["bindings"]  =  currentBindings
    
  }

  unbind(binding, scope) {
    delete scope.bindingContext["bindings"];
  }
}